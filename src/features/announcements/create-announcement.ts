import { apiFetch } from "@/api/api-fetch.ts"
import { getAnnouncementsUrl } from "@/api/urls.ts"
import { AnnouncementCreateParameters } from "@/features/announcements/types/announcement-types.ts"

export const createAnnouncement = async (values: AnnouncementCreateParameters) => {
  const response = await apiFetch(getAnnouncementsUrl(), {
    method: "POST",
    body: JSON.stringify(values),
  })
  return response.json()
}
