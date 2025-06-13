import { useState, useMemo } from "react"
import { useGetTeachers } from "@/features/classes-schedule/teachers/hooks/use-teachers-query.ts"
import { TeacherForm } from "@/ui/components/DaysBlock/Class/TeacherForm.tsx"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/basic/dialog.tsx"
import { Plus } from "lucide-react"
import { Button } from "@/ui/basic/button.tsx"
import { Breadcrumbs } from "@/ui/components/common/Breadcrumbs.tsx"
import { TeacherCard } from "@/ui/components/Settings/TeacherCard.tsx"

export const TeachersSettingsPage = () => {
  const navigate = useNavigate()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { data: teachers } = useGetTeachers()

  const breadcrumbLevels = [
    { title: "Управление", onClick: () => navigate("/settings") },
    { title: "Управление преподавателями" },
  ]

  const selectedTeacher = useMemo(() => {
    if (!selectedId || !teachers?.data) return null
    return teachers.data.find(t => t.id === selectedId)
  }, [selectedId, teachers?.data])

  const handleCreate = async () => {
    setIsCreateOpen(false)
  }

  const handleEdit = async () => {
    setIsEditOpen(false)
    setSelectedId(null)
  }

  const handleCardClick = (id: string) => {
    setSelectedId(id)
    setIsEditOpen(true)
  }

  return (
    <div className="mx-8 flex flex-col items-start gap-4">
      <div className="flex w-full flex-col gap-2">
        <Breadcrumbs levels={breadcrumbLevels} />
        <div className="flex w-full items-center justify-between">
          <p className="font-raleway mb-1 text-xl/6 font-medium">Управление преподавателями</p>
          <Button className="ml-4" onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Добавить преподавателя
          </Button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teachers?.data.map(teacher => (
            <div
              key={teacher.id}
              onClick={() => handleCardClick(teacher.id)}
              className="cursor-pointer">
              <TeacherCard teacher={teacher} />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавление преподавателя</DialogTitle>
          </DialogHeader>
          <TeacherForm onSuccess={handleCreate} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Редактирование преподавателя</DialogTitle>
          </DialogHeader>
          {selectedTeacher && (
            <TeacherForm
              id={selectedTeacher.id}
              initial={{
                name: selectedTeacher.name,
                full_name: selectedTeacher.full_name || undefined,
              }}
              onSuccess={handleEdit}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
