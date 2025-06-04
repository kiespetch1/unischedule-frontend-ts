import { Bell, User, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../basic/card.tsx"
import { useNavigate } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/ui/basic/breadcrumb.tsx"
import { useEffect } from "react"

export const SettingsPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Управление"
  }, [])

  return (
    <div className="mx-8 flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Управление</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <p className="font-raleway text-xl/6 font-medium">Выберите действие</p>
      </div>
      <div className="flex w-full flex-row flex-wrap justify-start gap-4">
        <Card
          className="w-[calc(33.333%-16px)] cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => {
            navigate("/settings/groups")
          }}>
          <CardHeader className="flex items-center space-x-4">
            <Users width={34} height={34} color="#0966BB" />
            <CardTitle>Управление группами</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Импорт, редактирование и удаление групп</CardDescription>
          </CardContent>
        </Card>
        <Card
          className="w-[calc(33.333%-16px)] cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => {
            navigate("/settings/profile")
          }}>
          <CardHeader className="flex items-center space-x-4">
            <User width={34} height={34} color="#0966BB" />
            <CardTitle>Управление профилем</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Редактирование предпочтений внешнего вида и данных профиля
            </CardDescription>
          </CardContent>
        </Card>
        <Card
          className="w-[calc(33.333%-16px)] cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => {
            navigate("/settings/announcements")
          }}>
          <CardHeader className="flex items-center space-x-4">
            <Bell width={32} height={32} color="#0966BB" />
            <CardTitle>Управление объявлениями</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Создание, редактирование и удаление объявлений</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
