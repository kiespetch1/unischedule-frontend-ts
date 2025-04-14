export type WeekTypeStrict = "even" | "odd"

export type SubgroupStrict = "first" | "second"

export interface GroupModelCollectionResult {
  data: GroupModel[] | null
  total_count: number
}

export interface GroupModel {
  id: string
  name: string
  grade: number
  has_subgroups: boolean
  has_fixed_subgroups: boolean
  last_announcement?: AnnouncementModel
  weeks: WeekModel[]
}

export type AnnouncementPriority = "normal" | "high" | "very_high"

export interface AnnouncementModel {
  id: string
  message: string
  priority: AnnouncementPriority
  is_anonymous: boolean
  created_at: string
  created_by: UserModel
  updated_at: string
  updated_by: UserModel
}

export interface UserModel {
  id: string
  surname?: string | null
  name?: string | null
  patronymic?: string | null
  email?: string | null
}

export interface WeekModel {
  id: string
  group_id: string
  type: WeekType
  subgroup: Subgroup
  days?: DayModel[] | null
}

export interface DayModel {
  id: string
  day_of_week: DayOfWeek
  week_id: string
  classes?: ClassModel[] | null
}

export type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"

export interface ClassModel {
  id: string
  name: string
  started_at: string
  finished_at: string
  week_type: WeekType
  subgroup: Subgroup
  is_cancelled: boolean
  day_id: string
  location: LocationModel
  teacher: TeacherModel
}

export type WeekType = "every" | "even" | "odd"

export type Subgroup = "none" | "first" | "second" | "third"

export interface LocationModel {
  id: string
  name: string
  link?: string | null
  location_type: LocationType
}

export type LocationType = "irl" | "online"

export interface TeacherModel {
  id: string
  name: string
  full_name?: string | null
}
