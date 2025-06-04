import { apiFetch } from "@/api/api-fetch.ts"
import {
  getClassCancelByIdUrl,
  getClassRestoreByIdUrl,
  getClassesCancelByDayNamesUrl,
  getClassesCancelByGroupIdUrl,
} from "@/api/urls.ts"
import { DayOfWeek } from "@/features/classes-schedule/types/classes-types.ts"

export const cancelClass = async (classId: string) => {
  await apiFetch(getClassCancelByIdUrl(classId), { method: "PATCH" })
}

export const restoreClass = async (classId: string) => {
  await apiFetch(getClassRestoreByIdUrl(classId), { method: "PATCH" })
}

export interface GroupsCancelDaysData {
  even: DayOfWeek[]
  odd: DayOfWeek[]
}

export const cancelAllClassesByDaysName = async (data: GroupsCancelDaysData) => {
  await apiFetch(getClassesCancelByDayNamesUrl(), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

export const cancelAllClassesByGroupId = async (groupId: string) => {
  await apiFetch(getClassesCancelByGroupIdUrl(groupId), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  })
}
