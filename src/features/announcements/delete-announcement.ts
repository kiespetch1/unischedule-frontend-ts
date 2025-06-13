import { apiFetch } from "@/api/api-fetch.ts"
import { getAnnouncementByIdUrl } from "@/api/urls.ts"

export const deleteAnnouncement = async (id: string) => {
  await apiFetch(getAnnouncementByIdUrl(id), { method: "DELETE" })
}
