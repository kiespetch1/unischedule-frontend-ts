import { UserExtendedModel } from "@/features/classes-schedule/types/classes-types"

export interface UserPermissions {
  can_register_user: boolean
  can_update_user: boolean
  can_get_current_user: boolean
  can_create_announcement: boolean
  can_update_announcement: boolean
  can_delete_announcement: boolean
  can_create_class: boolean
  can_update_class: boolean
  can_delete_class: boolean
  can_cancel_class: boolean
  can_restore_class: boolean
  can_copy_class: boolean
  can_create_group: boolean
  can_update_group: boolean
  can_delete_group: boolean
  can_update_grades: boolean
  can_create_location: boolean
  can_update_location: boolean
  can_delete_location: boolean
  can_create_teacher: boolean
  can_update_teacher: boolean
  can_delete_teacher: boolean
  can_create_week: boolean
  can_delete_week: boolean
}

export interface PermissionsResult {
  data: UserPermissions
  error: null | string
}

export interface AuthState {
  userData: UserExtendedModel | null
  isAuthenticated: boolean
  permissions: UserPermissions | null
  isLoading: boolean
  error: string | null
}

export interface AuthContextType {
  authState: AuthState
  login: () => Promise<void>
  logout: () => Promise<void>
  refreshPermissions: () => Promise<void>
}
