import { useState, useMemo } from "react"
import { useGetLocations } from "@/features/classes-schedule/locations/hooks/use-locations-query.ts"
import { LocationType } from "@/features/classes-schedule/types/classes-types.ts"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/basic/dialog.tsx"
import { Plus } from "lucide-react"
import { Button } from "@/ui/basic/button.tsx"
import { Breadcrumbs } from "@/ui/components/common/Breadcrumbs.tsx"
import { LocationCard } from "@components/Settings/LocationsSettingsPage/LocationCard.tsx"
import { LocationForm } from "@/ui/components/DaysBlock/Class/LocationForm.tsx"

export const LocationsSettingsPage = () => {
  const navigate = useNavigate()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { data: locations } = useGetLocations()

  const breadcrumbLevels = [
    { title: "Управление", onClick: () => navigate("/settings") },
    { title: "Управление местами проведения" },
  ]

  const selectedLocation = useMemo(() => {
    if (!selectedId || !locations?.data) return null
    return locations.data.find(l => l.id === selectedId)
  }, [selectedId, locations?.data])

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
          <p className="font-raleway mb-1 text-xl/6 font-medium">Управление местами проведения</p>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Создать место проведения
          </Button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-y-4">
        <div className="grid grid-cols-3 gap-4">
          {locations?.data.map(location => (
            <div
              key={location.id}
              onClick={() => handleCardClick(location.id)}
              className="cursor-pointer">
              <LocationCard location={location} />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Создание места проведения</DialogTitle>
          </DialogHeader>
          <LocationForm onSuccess={handleCreate} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Редактирование места проведения</DialogTitle>
          </DialogHeader>
          {selectedLocation && (
            <LocationForm
              id={selectedLocation.id}
              initial={{
                name: selectedLocation.name,
                type: selectedLocation.type as LocationType,
                link: selectedLocation.link || null,
              }}
              onSuccess={handleEdit}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
