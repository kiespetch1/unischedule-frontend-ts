import { getClassesCopyByDayIdUrl } from "@/api/urls.ts"
import { apiFetch } from "@/api/api-fetch.ts"

export const copyClasses = async (dayId: string) => {
  await apiFetch(getClassesCopyByDayIdUrl(dayId), { method: "POST" })
}
