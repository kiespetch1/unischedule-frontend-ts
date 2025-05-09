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
  UserExtendedModel,
} from "@/features/classes-schedule/types/classes-types.ts"
import { ClassEditModel } from "@/features/classes-schedule/dto/edit-class-model.ts"
import { PermissionsResult, UserPermissions } from "@/features/auth/types/auth-types.ts"

export const defaultWeekType: WeekTypeStrict = "odd"
export const defaultSubgroup: SubgroupStrict = "first"
export const defaultDayOfWeek: DayOfWeek = DayOfWeek.Monday
export const defaultId = "00000000-0000-0000-0000-000000000000"

export const defaultDay: DayModel = {
  id: defaultId,
  week_id: defaultId,
  day_of_week: defaultDayOfWeek,
  classes: [],
}

export const defaultWeek: WeekModel = {
  id: defaultId,
  group_id: defaultId,
  type: "every" as WeekType,
  subgroup: "none" as Subgroup,
  days: [],
}

export const defaultLocation: LocationModel = {
  id: defaultId,
  name: "4-321",
  link: null,
  type: "irl" as LocationType,
}

export const defaultTeacher: TeacherModel = { id: defaultId, name: "Иванов И. И.", full_name: null }

export const defaultClass: ClassModel = {
  id: defaultId,
  name: "Новая пара",
  started_at: "09:00:00",
  finished_at: "10:45:00",
  type: "lecture" as ClassType,
  week_type: "every" as WeekType,
  subgroup: "none" as Subgroup,
  is_cancelled: false,
  day_id: defaultId,
  location: defaultLocation,
  teacher: defaultTeacher,
}

export const defaultClassEdit: ClassEditModel = {
  name: "Новая пара",
  started_at: "09:00",
  finished_at: "10:45",
  type: "lecture" as ClassType,
  features: { week_type: "every" as WeekType, subgroup: "none" as Subgroup },
  location_id: defaultId,
  teacher_id: defaultId,
  is_new: true,
}

export const defaultUser: UserModel = {
  id: defaultId,
  surname: null,
  name: null,
  patronymic: null,
  email: null,
}

export const defaultExtendedUser: UserExtendedModel = {
  id: defaultId,
  surname: null,
  name: null,
  patronymic: null,
  email: null,
  role: "User",
  group_id: defaultId,
  managed_group_ids: [],
}

export const defaultAnnouncement: AnnouncementModel = {
  id: defaultId,
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
  id: defaultId,
  name: "",
  grade: 0,
  has_subgroups: false,
  has_fixed_subgroups: false,
  announcements_block: null,
  last_academic_week_number: 0,
  weeks: [],
}

export const defaultPermissions: UserPermissions = {
  can_register_user: false,
  can_update_user: false,
  can_get_current_user: false,
  can_create_announcement: false,
  can_update_announcement: false,
  can_delete_announcement: false,
  can_create_class: false,
  can_update_class: false,
  can_delete_class: false,
  can_cancel_class: false,
  can_restore_class: false,
  can_copy_class: false,
  can_create_group: false,
  can_update_group: false,
  can_delete_group: false,
  can_update_grades: false,
  can_create_location: false,
  can_update_location: false,
  can_delete_location: false,
  can_create_teacher: false,
  can_update_teacher: false,
  can_delete_teacher: false,
  can_create_week: false,
  can_delete_week: false,
}

export const defaultPermissionsResult: PermissionsResult = { data: defaultPermissions, error: null }
