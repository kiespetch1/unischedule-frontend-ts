import { apiFetch } from "@/api/api-fetch.ts"
import { getClassesClearByDayIdUrl } from "@/api/urls.ts"

export const clearClasses = async (dayId: string) => {
  await apiFetch(getClassesClearByDayIdUrl(dayId), { method: "POST" })
}
