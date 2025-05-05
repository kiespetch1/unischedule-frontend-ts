import {
  DayModel,
  DayOfWeek,
  SubgroupStrict,
  WeekModel,
  WeekTypeStrict,
  ClassModel,
  LocationModel,
  TeacherModel,
  AnnouncementModel,
  UserModel,
  GroupModel,
  WeekType,
  Subgroup,
  ClassType,
  LocationType,
  AnnouncementPriority,
} from "@/features/classes-schedule/types/classes-types.ts"
import { ClassEditModel } from "@/features/classes-schedule/dto/edit-class-model.ts"

export const defaultWeekType: WeekTypeStrict = "odd"
export const defaultSubgroup: SubgroupStrict = "first"
export const defaultDayOfWeek: DayOfWeek = DayOfWeek.Monday

export const defaultDay: DayModel = {
  id: "00000000-0000-0000-0000-000000000000",
  week_id: "00000000-0000-0000-0000-000000000000",
  day_of_week: defaultDayOfWeek,
  classes: [],
}

export const defaultWeek: WeekModel = {
  id: "00000000-0000-0000-0000-000000000000",
  group_id: "00000000-0000-0000-0000-000000000000",
  type: "every" as WeekType,
  subgroup: "none" as Subgroup,
  days: [],
}

export const defaultLocation: LocationModel = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "4-321",
  link: null,
  type: "irl" as LocationType,
}

export const defaultTeacher: TeacherModel = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "Иванов И. И.",
  full_name: null,
}

export const defaultClass: ClassModel = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "Новая пара",
  started_at: "09:00",
  finished_at: "10:45",
  type: "lecture" as ClassType,
  week_type: "every" as WeekType,
  subgroup: "none" as Subgroup,
  is_cancelled: false,
  day_id: "00000000-0000-0000-0000-000000000000",
  location: defaultLocation,
  teacher: defaultTeacher,
}

export const defaultClassEdit: ClassEditModel = {
  name: "Новая пара",
  started_at: "09:00",
  finished_at: "10:45",
  type: "lecture" as ClassType,
  features: { week_type: "every" as WeekType, subgroup: "none" as Subgroup },
  location_id: "00000000-0000-0000-0000-000000000000",
  teacher_id: "00000000-0000-0000-0000-000000000000",
}

export const defaultUser: UserModel = {
  id: "00000000-0000-0000-0000-000000000000",
  surname: null,
  name: null,
  patronymic: null,
  email: null,
}

export const defaultAnnouncement: AnnouncementModel = {
  id: "00000000-0000-0000-0000-000000000000",
  message: "",
  priority: "normal" as AnnouncementPriority,
  is_anonymous: false,
  is_time_limited: false,
  available_until: "",
  created_at: "",
  created_by: defaultUser,
  updated_at: "",
  updated_by: defaultUser,
}

export const defaultGroup: GroupModel = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "",
  grade: 0,
  has_subgroups: false,
  has_fixed_subgroups: false,
  announcements_block: null,
  last_academic_week_number: 0,
  weeks: [],
}
