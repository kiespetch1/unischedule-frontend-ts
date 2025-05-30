import { PermissionGate } from "@/features/auth/components/auth-gate"
import { SettingsPage } from "@/ui/pages/SettingsPage"

const Settings: React.FC = () => (
  <PermissionGate permission="can_update_group">
    <SettingsPage />
  </PermissionGate>
)

export default Settings
