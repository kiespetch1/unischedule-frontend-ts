﻿import { IDENTITY_URL, SCHEDULE_URL, EVENTS_URL } from "@/config/api.ts"

export type ApiServiceType = "identity" | "schedule" | "events"

export const getServiceBaseUrl = (serviceType: ApiServiceType): string => {
  switch (serviceType) {
    case "identity":
      return IDENTITY_URL
    case "schedule":
      return SCHEDULE_URL
    case "events":
      return EVENTS_URL
    default:
      return IDENTITY_URL
  }
}

export const getServiceTypeFromUrl = (url: string): ApiServiceType => {
  if (url.startsWith(IDENTITY_URL)) return "identity"
  if (url.startsWith(SCHEDULE_URL)) return "schedule"
  if (url.startsWith(EVENTS_URL)) return "events"

  return "identity"
}

export const getAntiforgeryRefreshUrl = (serviceType: ApiServiceType = "identity"): string => {
  return `${getServiceBaseUrl(serviceType)}/api/v1/account/antiforgery`
}

export const getLoginUrl = () => `${IDENTITY_URL}/api/v1/account/sign_in`

export const getRefreshUrl = () => `${IDENTITY_URL}/api/v1/account/refresh`

export const getCurrentUserUrl = () => `${IDENTITY_URL}/api/v1/account/me`

export const getLogoutUrl = () => `${IDENTITY_URL}/api/v1/account/sign_out`

export const getPermissionsUrl = () => `${IDENTITY_URL}/api/v1/account/me/permissions`

export const getGroupByIdUrl = (groupId: string) => `${SCHEDULE_URL}/api/v1/groups/${groupId}`

export const getGroupsUrl = () => `${SCHEDULE_URL}/api/v1/groups`

export const getTeachersUrl = () => `${SCHEDULE_URL}/api/v1/teachers`

export const getLocationsUrl = () => `${SCHEDULE_URL}/api/v1/locations`

export const getClassUrl = () => `${SCHEDULE_URL}/api/v1/classes`

export const getClassByIdUrl = (classId: string) => `${SCHEDULE_URL}/api/v1/classes/${classId}`

export const getClassesCopyByDayIdUrl = (dayId: string) =>
  `${SCHEDULE_URL}/api/v1/classes/copy/${dayId}`

export const getClassesClearByDayIdUrl = (dayId: string) =>
  `${SCHEDULE_URL}/api/v1/classes/clear/${dayId}`

export const getAnnouncementsUrl = () => `${SCHEDULE_URL}/api/v1/announcements`
