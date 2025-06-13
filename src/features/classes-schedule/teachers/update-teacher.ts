import { apiFetch } from "@/api/api-fetch.ts"
import { getTeacherByIdUrl } from "@/api/urls.ts"
import { TeacherCreateModel } from "@/features/classes-schedule/teachers/create-teacher.ts"

export const updateTeacher = async (id: string, values: TeacherCreateModel) => {
  await apiFetch(getTeacherByIdUrl(id), { method: "PUT", body: JSON.stringify(values) })
}
