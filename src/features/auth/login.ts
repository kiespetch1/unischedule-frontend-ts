import { apiFetch } from "@/api/api-fetch.ts"
import { getLoginUrl } from "@/api/urls.ts"
import toast from "react-hot-toast"
import { ApiError } from "@/api/api-error.ts"

export interface LoginParams {
  login: string
  password: string
}

export const login = async (credentials: LoginParams): Promise<boolean> => {
  const response = await apiFetch(getLoginUrl(), {
    method: "POST",
    body: JSON.stringify(credentials),
    useXsrfProtection: false,
  })

  if (response.ok) {
    toast.success("Успешная авторизация!")
    return true
  } else {
    const data = await response.json().catch(() => null)
    toast.error(data?.message || "Ошибка запроса")
    throw new ApiError(response, data)
  }
}
