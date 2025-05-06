import { ClassEditModelFlat } from "@/features/classes-schedule/dto/edit-class-model.ts"
import { apiFetch } from "@/api/api-fetch.ts"
import { getClassByIdUrl } from "@/api/urls.ts"

export const updateClass = async (classId: string, values: ClassEditModelFlat) => {
  await apiFetch(getClassByIdUrl(classId), { method: "PUT", body: JSON.stringify(values) })
}
