import { apiFetch } from "@/api/api-fetch.ts"
import { getRefreshUrl } from "@/api/urls.ts"

export const refresh = async (): Promise<void> => {
  await apiFetch(getRefreshUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
}
