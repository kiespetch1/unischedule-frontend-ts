import { PermissionGate } from "@/features/auth/components/auth-gate"
import { GroupSettingsPage } from "@/ui/pages/settings/GroupSettingsPage.tsx"

const GroupSettings = () => {
  return (
    <PermissionGate
      permissions={["can_update_group", "can_delete_group"]}
      requireAll={false}
      redirectTo="/">
      <GroupSettingsPage />
    </PermissionGate>
  )
}

export default GroupSettings
