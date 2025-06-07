import { Bell, User, Users, MapPin, GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../basic/card.tsx"
import { useNavigate } from "react-router-dom"
import { Breadcrumbs } from "@/ui/components/common/Breadcrumbs.tsx"
import { useEffect } from "react"

export const SettingsPage = () => {
  const navigate = useNavigate()
  const iconClass =
    "flex-none text-[#0966BB] w-8  h-8 sm:w-7 sm:h-7 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8"

  useEffect(() => {
    document.title = "Управление"
  }, [])

  return (
    <div className="mx-8 flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        <Breadcrumbs levels={[{ title: "Управление" }]} />
        <p className="font-raleway text-xl/6 font-medium">Выберите действие</p>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          className="min-w-0 cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => {
            navigate("/settings/groups")
          }}>
          <CardHeader className="flex items-center space-x-4">
            <Users className={iconClass} />
            <CardTitle>Управление группами</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Импорт, редактирование и удаление групп</CardDescription>
          </CardContent>
        </Card>
        <Card
          className="min-w-0 cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => {
            navigate("/settings/profile")
          }}>
          <CardHeader className="flex items-center gap-4">
            <User className={iconClass} />
            <CardTitle>Управление профилем</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Редактирование предпочтений внешнего вида и данных профиля
            </CardDescription>
          </CardContent>
        </Card>
        <Card
          className="min-w-0 cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => {
            navigate("/settings/announcements")
          }}>
          <CardHeader className="flex items-center gap-4">
            <Bell className={iconClass} />
            <CardTitle>Управление объявлениями</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Создание, редактирование и удаление объявлений</CardDescription>
          </CardContent>
        </Card>
        <Card
          className="min-w-0 cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => {
            navigate("/settings/teachers")
          }}>
          <CardHeader className="flex items-center gap-4">
            <GraduationCap className={iconClass} />
            <CardTitle>Управление преподавателями</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Добавление, редактирование и удаление преподавателей</CardDescription>
          </CardContent>
        </Card>
        <Card
          className="min-w-0 cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => {
            navigate("/settings/locations")
          }}>
          <CardHeader className="flex items-center gap-4">
            <MapPin className={iconClass} />
            <CardTitle>Управление местами проведения</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Добавление, редактирование и удаление мест проведения занятий
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
