import { apiFetch } from "@/api/api-fetch.ts"
import { getCurrentUserUrl } from "@/api/urls.ts"

export const getAccountInfo = async () => {
  const response = await apiFetch(getCurrentUserUrl(), { method: "GET" })
  return response.json()
}
