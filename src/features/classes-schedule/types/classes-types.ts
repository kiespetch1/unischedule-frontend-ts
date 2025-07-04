export type WeekTypeStrict = "even" | "odd"

export type SubgroupStrict = "first" | "second"

export type AnnouncementPriority = "normal" | "high" | "very_high"

export type WeekType = "every" | "even" | "odd"

export type ClassType = "lecture" | "practice" | "lab_work"

export type Subgroup = "none" | "first" | "second"

export type LocationType = "irl" | "online"

export type RoleType = "admin" | "staff" | "group_leader" | "user"

export enum DayOfWeek {
  Sunday = "sunday",
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday",
  Saturday = "saturday",
}

export interface GroupModel {
  id: string
  name: string
  grade: number
  has_fixed_subgroups: boolean
  announcements_block: AnnouncementBlockModel | null
  last_academic_week_number: number
  weeks: WeekModel[]
}

export interface AnnouncementTargetModel {
  included_grades: number[]
  included_groups: string[]
  included_departments: string[]
  excluded_grades: number[]
  excluded_groups: string[]
  excluded_departments: string[]
}

export interface AnnouncementModel {
  id: string
  message: string
  target?: AnnouncementTargetModel | null
  priority: AnnouncementPriority
  is_anonymous: boolean
  is_time_limited: boolean
  available_until: string | null
  is_added_using_bot: boolean
  created_at: string
  created_by: UserModel | null
  updated_at: string
  updated_by: UserModel | null
}

export interface AnnouncementBlockModel {
  last?: AnnouncementModel
  last_time_limited?: AnnouncementModel
}

export interface UserModel {
  id: string
  surname?: string | null
  name?: string | null
  patronymic?: string | null
  email?: string | null
}

export interface UserExtendedModel {
  id: string
  surname?: string | null
  name?: string | null
  patronymic?: string | null
  email?: string | null
  role: RoleType
  group_id: string
  managed_group_ids: string[]
}

export interface WeekModel {
  id: string
  group_id: string
  type: WeekType
  subgroup: Subgroup
  days: DayModel[]
}

export interface DayModel {
  id: string
  day_of_week: DayOfWeek
  week_id: string
  classes?: ClassModel[] | null
}

export interface ClassModel {
  id: string
  name: string
  started_at: string
  finished_at: string
  type: ClassType
  week_type: WeekType
  subgroup: Subgroup
  is_cancelled: boolean
  is_hidden?: boolean
  day_id: string
  location: LocationModel
  teacher: TeacherModel
}

export interface ClassWithDayModel {
  id: string
  name: string
  started_at: string
  finished_at: string
  type: ClassType
  week_type: WeekType
  subgroup: Subgroup
  is_cancelled: boolean
  day_id: string
  day: DayModel
  location: LocationModel
  teacher: TeacherModel
}

export interface LocationModel {
  id: string
  name: string
  link?: string | null
  type: LocationType
}

export interface TeacherModel {
  id: string
  name: string
  full_name?: string | null
}

export interface LmsData {
  id: string
  subject: string
  data: string
  group_id: string
}

export interface LmsDataResponse {
  data: LmsData[]
  total_count: number
}

export interface LmsDataCreateParameters {
  subject: string
  data: string
  group_id: string
}
