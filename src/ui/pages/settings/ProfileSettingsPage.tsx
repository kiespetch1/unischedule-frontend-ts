import { Breadcrumbs } from "@components/common/Breadcrumbs.tsx"
import type { BreadcrumbLevel } from "@components/common/Breadcrumbs.tsx"
import { ProfileForm } from "@/ui/components/Settings/ProfileForm.tsx"
import { PreferencesForm } from "@/ui/components/Settings/PreferencesForm.tsx"
import { useNavigate } from "react-router-dom"

export const ProfileSettingsPage = () => {
  const navigate = useNavigate()
  const breadcrumbLevels: BreadcrumbLevel[] = [
    { title: "Управление", onClick: () => navigate("/settings") },
    { title: "Управление профилем" },
  ]

  return (
    <div className="mx-8 flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        <Breadcrumbs levels={breadcrumbLevels} />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-raleway mb-1 text-xl/6 font-medium">Управление профилем</p>
            <ProfileForm />
          </div>
          <div>
            <p className="font-raleway mb-1 text-lg/6 font-medium">Предпочтения</p>
            <PreferencesForm />
          </div>
        </div>
      </div>
    </div>
  )
}
