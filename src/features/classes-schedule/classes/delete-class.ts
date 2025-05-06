import { apiFetch } from "@/api/api-fetch.ts"
import { getClassByIdUrl } from "@/api/urls.ts"

export const deleteClass = async (classId: string) => {
  await apiFetch(getClassByIdUrl(classId), { method: "DELETE" })
}
