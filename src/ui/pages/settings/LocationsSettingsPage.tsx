import { Breadcrumbs } from "@components/common/Breadcrumbs.tsx"
import { useNavigate } from "react-router-dom"

export const LocationsSettingsPage = () => {
  const navigate = useNavigate()
  const breadcrumbLevels = [
    { title: "Управление", onClick: () => navigate("/settings") },
    { title: "Управление местами проведения", onClick: () => {} },
  ]
  return (
    <div className="mx-8 flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        <Breadcrumbs levels={breadcrumbLevels} />
      </div>
    </div>
  )
}
