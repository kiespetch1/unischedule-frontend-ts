import { PermissionGate } from "@/features/auth/components/auth-gate"
import { TeachersSettingsPage } from "@/ui/pages/settings/TeachersSettingsPage.tsx"
import { FC } from "react"

const TeachersSettings: FC = () => (
  <PermissionGate permissions="can_update_teacher" redirectTo="/">
    <TeachersSettingsPage />
  </PermissionGate>
)

export default TeachersSettings
