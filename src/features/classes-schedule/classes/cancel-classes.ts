import { apiFetch } from "@/api/api-fetch.ts"
import { getClassesCancelByDaysUrl } from "@/api/urls.ts"

export const cancelClassesByDays = async (dayIds: string[]) => {
  await apiFetch(getClassesCancelByDaysUrl(), { 
    method: "PATCH", 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ day_ids: dayIds })
  })
}