import { Breadcrumbs } from "@components/common/Breadcrumbs.tsx"
import { useNavigate } from "react-router-dom"

export const TeachersSettingsPage = () => {
  const navigate = useNavigate()
  const breadcrumbLevels = [
    { title: "Управление", onClick: () => navigate("/settings") },
    { title: "Управление преподавателями", onClick: () => {} },
  ]
  return (
    <div className="mx-8 flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        <Breadcrumbs levels={breadcrumbLevels} />
      </div>
    </div>
  )
}
