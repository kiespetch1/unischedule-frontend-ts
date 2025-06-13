import { Breadcrumbs } from "@components/common/Breadcrumbs.tsx"
import type { BreadcrumbLevel } from "@components/common/Breadcrumbs.tsx"
import { ProfileForm } from "@/ui/components/Settings/ProfileForm.tsx"
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
        <p className="font-raleway mb-1 text-xl/6 font-medium">Управление профилем</p>
        <ProfileForm />
      </div>
    </div>
  )
}
