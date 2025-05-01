import { apiFetch } from "@/api/api-fetch.ts"
import { getLoginUrl } from "@/api/urls.ts"
import toast from "react-hot-toast"
import { ApiError } from "@/api/api-error.ts"

export interface LoginParams {
  login: string
  password: string
}

export const login = async (credentials: LoginParams) => {
  const response = await apiFetch(getLoginUrl(), {
    body: JSON.stringify(credentials),
    isPublic: true,
  })

  if (response.ok) {
    toast.success("Успешная авторизация!")
  } else {
    const data = await response.json().catch(() => null)
    toast.error(data?.message || "Ошибка запроса")
    throw new ApiError(response, data)
  }
}
