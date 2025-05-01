import { ApiError } from "./api-error"
import toast from "react-hot-toast"
import { getXsrfToken, setXsrfToken } from "@/features/auth/utils/tokens.ts"
import { refresh } from "@/features/auth/refresh.ts"

export async function apiFetch(
  input: RequestInfo,
  init?: RequestInit & { isPublic?: boolean }
): Promise<Response> {
  const { isPublic = false, ...fetchInit } = init || {}

  const headers = new Headers(fetchInit.headers)
  headers.set("Content-Type", "application/json-patch+json")
  fetchInit.headers = headers
  fetchInit.credentials = isPublic ? "omit" : "include"

  if (!isPublic) {
    const xsrf = getXsrfToken()
    if (xsrf) {
      headers.set("XSRF-TOKEN", xsrf)
    }
  }

  async function doFetch(retried = false): Promise<Response> {
    const res = await fetch(input, fetchInit)

    if (res.status === 401 && !isPublic && !retried) {
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
