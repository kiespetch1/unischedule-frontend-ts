import { ClassCreateModel } from "@/features/classes-schedule/dto/edit-class-model.ts"
import { apiFetch } from "@/api/api-fetch.ts"
import { getClassUrl } from "@/api/urls.ts"

export const createClass = async (values: ClassCreateModel) => {
  await apiFetch(getClassUrl(), { method: "POST", body: JSON.stringify(values) })
}
