import { apiFetch } from "@/api/api-fetch"
import { getClassRestoreByIdsUrl } from "@/api/urls"

export const restoreClassesByIds = async (classIds: string[]) => {
  await apiFetch(getClassRestoreByIdsUrl(), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ class_ids: classIds }),
  })
}
