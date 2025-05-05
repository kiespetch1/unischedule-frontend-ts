import { getTeachersUrl } from "@/api/urls.ts"
import { apiFetch } from "@/api/api-fetch.ts"
import { DataPage } from "@/types/data-page.ts"
import { TeacherModel } from "@/features/classes-schedule/types/classes-types.ts"

export const getTeachers = async () => {
  const url = new URL(getTeachersUrl())
  return apiFetch(url.href, { useCredentials: false, useXsrfProtection: false }).then(
    response => response.json() as Promise<DataPage<TeacherModel>>
  )
}
