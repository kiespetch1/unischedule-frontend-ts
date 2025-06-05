import { apiFetch } from "@/api/api-fetch"
import { getClassesRestoreByIdsUrl } from "@/api/urls"

export const restoreClassesByIds = async (classIds: string[]) => {
  await apiFetch(getClassesRestoreByIdsUrl(), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ class_ids: classIds }),
  })
}
