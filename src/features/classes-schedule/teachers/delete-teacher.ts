import { apiFetch } from "@/api/api-fetch.ts"
import { getTeacherByIdUrl } from "@/api/urls.ts"

export const deleteTeacher = async (id: string) => {
  await apiFetch(getTeacherByIdUrl(id), { method: "DELETE" })
}
