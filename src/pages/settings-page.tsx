import { PermissionGate } from "@/features/auth/components/auth-gate"
import { SettingsPage } from "@/ui/pages/settings/SettingsPage.tsx"
import { FC } from "react"

const Settings: FC = () => {
  return (
    <PermissionGate
      permissions={["can_update_group", "can_update_announcement"]}
      requireAll={false}
      redirectTo="/">
      <SettingsPage />
    </PermissionGate>
  )
}

export default Settings
