import { apiFetch } from "@/api/api-fetch.ts"
import { getGroupsCancelByDaysUrl } from "@/api/urls.ts"
import { DayOfWeek } from "@/features/classes-schedule/types/classes-types.ts"

export interface GroupsCancelDaysData {
  even: DayOfWeek[]
  odd: DayOfWeek[]
}

export const cancelGroupsByDays = async (data: GroupsCancelDaysData) => {
  await apiFetch(getGroupsCancelByDaysUrl(), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}
