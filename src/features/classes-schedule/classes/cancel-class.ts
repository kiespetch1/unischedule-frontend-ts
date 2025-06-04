import { apiFetch } from "@/api/api-fetch.ts"
import { getClassCancelByIdUrl, getClassRestoreByIdUrl } from "@/api/urls.ts"

export const cancelClass = async (classId: string) => {
  await apiFetch(getClassCancelByIdUrl(classId), { method: "PATCH" })
}

export const restoreClass = async (classId: string) => {
  await apiFetch(getClassRestoreByIdUrl(classId), { method: "PATCH" })
}