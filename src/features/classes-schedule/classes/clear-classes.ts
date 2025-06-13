import { apiFetch } from "@/api/api-fetch.ts"
import { getClassesClearByDayIdUrl, getClassesClearByGroupIdUrl } from "@/api/urls.ts"

export const clearClassesByDayId = async (dayId: string) => {
  await apiFetch(getClassesClearByDayIdUrl(dayId), { method: "PATCH" })
}

export const clearClassesByGroupId = async (groupId: string) => {
  await apiFetch(getClassesClearByGroupIdUrl(groupId), { method: "PATCH" })
}
