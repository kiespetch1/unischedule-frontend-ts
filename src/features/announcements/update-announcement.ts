import { apiFetch } from "@/api/api-fetch.ts"
import { getAnnouncementByIdUrl } from "@/api/urls.ts"
import { AnnouncementUpdateModel } from "@/features/announcements/types/announcement-types.ts"

export const updateAnnouncement = async (id: string, values: AnnouncementUpdateModel) => {
  await apiFetch(getAnnouncementByIdUrl(id), { method: "PUT", body: JSON.stringify(values) })
}
