import { ApiError } from "./api-error"
import { getXsrfToken, setXsrfToken } from "@/features/auth/utils/tokens"
import { refresh } from "@/features/auth/refresh"
import { getAntiforgeryRefreshUrl, getServiceTypeFromUrl } from "@/api/urls.ts"

let refreshPromise: Promise<void> | null = null
const xsrfRenewPromises: Record<string, Promise<void> | null> = {
  identity: null,
  schedule: null,
  events: null,
}

export async function apiFetch(
  input: RequestInfo,
  init?: RequestInit & { useCredentials?: boolean; useXsrfProtection?: boolean }
): Promise<Response> {
  const { useCredentials = true, useXsrfProtection = true, ...baseInit } = init ?? {}

  async function doFetch(tries = 0): Promise<Response> {
    const fetchInit: RequestInit = { ...baseInit }
    fetchInit.credentials = useCredentials ? "include" : "omit"

    const headers = new Headers(fetchInit.headers)
    const method = (fetchInit.method ?? "GET").toUpperCase()

    if (
      !headers.has("Content-Type") &&
      (method === "PATCH" || (fetchInit.body && typeof fetchInit.body === "string"))
    ) {
      headers.set(
        "Content-Type",
        method === "PATCH" ? "application/json-patch+json" : "application/json"
      )
    }

    if (
      useXsrfProtection &&
      useCredentials &&
      ["POST", "PUT", "PATCH", "DELETE"].includes(method)
    ) {
      const token = getXsrfToken()
      if (token) headers.set("XSRF-TOKEN", token)
    }

    fetchInit.headers = headers

    const response = await fetch(input, fetchInit)

    // 401 -> один общий refresh
    if (response.status === 401 && useCredentials && tries < 2) {
      if (!refreshPromise) refreshPromise = refresh().finally(() => (refreshPromise = null))
      await refreshPromise
      return doFetch(tries + 1)
    }

    // 403 -> пробуем получить новый request‑токен с нужного сервиса и повторить
    if (response.status === 403 && useXsrfProtection && tries < 2) {
      const url = typeof input === "string" ? input : input.url
      const serviceType = getServiceTypeFromUrl(url)

      if (!xsrfRenewPromises[serviceType]) {
        const antiforgeryUrl = getAntiforgeryRefreshUrl(serviceType)
        xsrfRenewPromises[serviceType] = fetch(antiforgeryUrl, { credentials: "include" })
          .then(r => setXsrfToken(r.headers.get("XSRF-TOKEN") || ""))
          .finally(() => (xsrfRenewPromises[serviceType] = null))
      }
      await xsrfRenewPromises[serviceType]
      return doFetch(tries + 1)
    }

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      throw new ApiError(response, data)
    }

    const newXsrf = response.headers.get("XSRF-TOKEN")
    if (newXsrf) setXsrfToken(newXsrf)

    return response
  }

  return doFetch()
}
