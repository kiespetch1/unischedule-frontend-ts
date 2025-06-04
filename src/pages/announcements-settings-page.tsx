import { PermissionGate } from "@/features/auth/components/auth-gate"
import { AnnouncementsSettingsPage } from "@/ui/pages/settings/AnnouncementsSettingsPage.tsx"
import { FC } from "react"

const AnnouncementsSettings: FC = () => (
  <PermissionGate permissions="can_update_announcement" redirectTo="/">
    <AnnouncementsSettingsPage />
  </PermissionGate>
)

export default AnnouncementsSettings
