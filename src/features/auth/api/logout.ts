import { apiFetch } from "@/api/api-fetch"
import { setXsrfToken } from "../utils/tokens"
import toast from "react-hot-toast"
import { getLogoutUrl } from "@/api/urls.ts"

export async function logout(): Promise<void> {
  try {
    const response = await apiFetch(getLogoutUrl(), { method: "POST", useCredentials: true })

    if (!response.ok) {
      throw new Error(`Ошибка при выходе: ${response.status}`)
    }
    setXsrfToken(null)

    return Promise.resolve()
  } catch (error) {
    console.error("Ошибка при выходе из системы:", error)
    toast.error("Не удалось выйти из системы")
    setXsrfToken(null)

    return Promise.reject(error)
  }
}
