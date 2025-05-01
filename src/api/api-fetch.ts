import { ApiError } from "./api-error"
import toast from "react-hot-toast"
import { getXsrfToken, setXsrfToken } from "@/features/auth/utils/tokens.ts"
import { refresh } from "@/features/auth/refresh.ts"

export async function apiFetch(
  input: RequestInfo,
  init?: RequestInit & { useCredentials?: boolean; useXsrfProtection?: boolean }
): Promise<Response> {
  const { useCredentials = true, useXsrfProtection = true, ...fetchInit } = init || {}

  fetchInit.credentials = useCredentials ? "include" : "omit"

  const headers = new Headers(fetchInit.headers)
  const method = fetchInit.method?.toUpperCase() || "GET"

  if (method === "PATCH") {
    headers.set("Content-Type", "application/json-patch+json")
  } else if (fetchInit.body) {
    headers.set("Content-Type", "application/json")
  }

  if (useXsrfProtection && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const xsrf = getXsrfToken()
    if (xsrf) {
      headers.set("XSRF-TOKEN", xsrf)
    }
  }

  fetchInit.headers = headers

  async function doFetch(retried = false): Promise<Response> {
    const res = await fetch(input, fetchInit)

    if (res.status === 401 && useCredentials && !retried) {
      await refresh()
      return doFetch(true)
    }

    if (!res.ok) {
      const data = await res.json().catch(() => null)
      toast.error(data?.message || "Ошибка запроса")
      throw new ApiError(res, data)
    }

    return res
  }

  const response = await doFetch()

  const newXsrf = response.headers.get("XSRF-TOKEN")
  if (newXsrf) {
    setXsrfToken(newXsrf)
  }

  return response
}
