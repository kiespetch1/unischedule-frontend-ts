import { AccessToken } from "../types/access-token"

export const isAccessTokenExpired = (token: AccessToken): boolean => Date.now() > token.expires

export const setAccessTokenInStorage = (token: AccessToken): void =>
  localStorage.setItem("access-token", JSON.stringify(token))

export const getAccessTokenFromStorage = (): AccessToken | null =>
  JSON.parse(localStorage.getItem("access-token") ?? "null")

export const getXsrfTokenFromCookie = (): string | null =>
  document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN" + "=")) ?? "null"

export const removeAccessTokenFromStorage = (): void => localStorage.removeItem("access-token")
