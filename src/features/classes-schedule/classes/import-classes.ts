import { apiFetch } from "@/api/api-fetch.ts"
import { getClassesScheduleImportUrl } from "@/api/urls.ts"

export interface ClassesScheduleImportParameters {
  groupId: string
  url: string
}

export const importClasses = async (data: ClassesScheduleImportParameters) => {
  await apiFetch(getClassesScheduleImportUrl(), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ group_id: data.groupId, url: data.url }),
  })
}
