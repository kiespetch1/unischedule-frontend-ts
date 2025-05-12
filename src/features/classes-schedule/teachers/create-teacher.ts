import { apiFetch } from "@/api/api-fetch.ts"
import { getTeachersUrl } from "@/api/urls.ts"
import { TeacherModel } from "@/features/classes-schedule/types/classes-types.ts"

export interface TeacherCreateModel {
  name: string
  full_name?: string | null
}

export const createTeacher = async (values: TeacherCreateModel): Promise<TeacherModel> => {
  const response = await apiFetch(getTeachersUrl(), { 
    method: "POST", 
    body: JSON.stringify(values) 
  })
  return response.json()
}