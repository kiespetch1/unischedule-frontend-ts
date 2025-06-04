import { PermissionGate } from "@/features/auth/components/auth-gate"
import { SettingsPage } from "@/ui/pages/settings/SettingsPage.tsx"

const Settings: React.FC = () => (
  <PermissionGate permission="can_update_group">
    <SettingsPage />
  </PermissionGate>
)

export default Settings
