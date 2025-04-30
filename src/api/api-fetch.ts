import { ApiError } from "./api-error"
import toast from "react-hot-toast"
import {
  getAccessTokenFromStorage,
  getXsrfTokenFromCookie,
  isAccessTokenExpired,
  setAccessTokenInStorage,
} from "@/features/auth/utils/tokens.ts"
import { refresh } from "@/features/auth/refresh.ts"

export const apiFetch = async (
  input: RequestInfo | URL,
  init: RequestInit & { refresh?: boolean; isPublic: boolean } = { refresh: true, isPublic: false }
): Promise<Response> => {
  const headers = new Headers(init?.headers)
  if (!init.isPublic) {
    const accessToken = getAccessTokenFromStorage()
    const xsrfToken = getXsrfTokenFromCookie()
    const doRefresh = init?.refresh === undefined || init.refresh

    if (doRefresh && accessToken && isAccessTokenExpired(accessToken)) {
      const accessToken = await refresh()
      setAccessTokenInStorage(accessToken)
    }

    if (accessToken) headers.set("Authorization", `Bearer ${accessToken.token}`)
    if (xsrfToken) headers.set("X-XSRF-TOKEN", xsrfToken)
  }
  const response = await fetch(input, { ...init, headers }).catch(() => null)
  if (!response?.ok) {
    const data = await response?.json()

    if (!(response?.status === 401 || response?.status === 403)) {
      toast.error(data)
    }
    throw new ApiError(response, data)
  }

  return response
}
