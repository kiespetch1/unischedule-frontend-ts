import { AnnouncementPriority, AnnouncementTargetModel } from "@/features/classes-schedule/types/classes-types.ts"


export const defaultAnnouncementTarget: AnnouncementTargetModel = {
  included_grades: [],
  included_groups: [],
  included_departments: [],
  excluded_grades: [],
  excluded_groups: [],
  excluded_departments: [],
}

export interface AnnouncementCreateParameters {
  message: string
  target: AnnouncementTargetModel
  priority: AnnouncementPriority
  is_anonymous: boolean
  is_time_limited: boolean
  available_until: string | null
}

export const defaultAnnouncementCreateParameters: AnnouncementCreateParameters = {
  message: "",
  target: defaultAnnouncementTarget,
  priority: "normal",
  is_anonymous: false,
  is_time_limited: false,
  available_until: null,
}

export type AnnouncementUpdateModel = AnnouncementCreateParameters
