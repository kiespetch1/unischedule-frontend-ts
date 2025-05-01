const XSRF_KEY = "XSRF-TOKEN"

export function setXsrfToken(token: string | null) {
  if (token) {
    localStorage.setItem(XSRF_KEY, token)
  } else {
    localStorage.removeItem(XSRF_KEY)
  }
}

export function getXsrfToken(): string | null {
  return localStorage.getItem(XSRF_KEY)
}
