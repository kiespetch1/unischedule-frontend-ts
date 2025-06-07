import { PermissionGate } from "@/features/auth/components/auth-gate"
import { LocationsSettingsPage } from "@/ui/pages/settings/LocationsSettingsPage.tsx"
import { FC } from "react"

const LocationsSettings: FC = () => (
  <PermissionGate permissions="can_update_location" redirectTo="/">
    <LocationsSettingsPage />
  </PermissionGate>
)

export default LocationsSettings
