import { useState, useMemo } from "react"
import { useGetAnnouncements } from "@/features/announcements/hooks/use-get-announcements.ts"
import { AnnouncementForm } from "@components/Settings/AnnouncementsSettingsPage/AnnouncementForm.tsx"
import { useCreateAnnouncement } from "@/features/announcements/hooks/use-create-announcement.ts"
import { useUpdateAnnouncement } from "@/features/announcements/hooks/use-update-announcement.ts"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/basic/dialog.tsx"
import { Plus } from "lucide-react"
import { AnnouncementCard } from "@components/Settings/AnnouncementsSettingsPage/AnnouncementCard.tsx"
import {
  AnnouncementCreateParameters,
  defaultAnnouncementCreateParameters,
} from "@/features/announcements/types/announcement-types.ts"
import { Button } from "@/ui/basic/button.tsx"
import { Breadcrumbs } from "@/ui/components/common/Breadcrumbs.tsx"
import { defaultAnnouncementParameters } from "@/utils/default-entities.ts"

export const AnnouncementsSettingsPage = () => {
  const navigate = useNavigate()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAnnouncements({
    groupId: "",
    limit: 10,
  })

  const { mutateAsync: create } = useCreateAnnouncement()
  const { mutateAsync: update } = useUpdateAnnouncement({ id: selectedId ?? "" })

  const breadcrumbLevels = [
    { title: "Управление", onClick: () => navigate("/settings") },
    { title: "Управление объявлениями" },
  ]

  const selectedAnnouncement = useMemo(() => {
    if (!selectedId || !data?.pages) return null
    for (const page of data.pages) {
      const found = page.data.find(a => a.id === selectedId)
      if (found) return found
    }
    return null
  }, [selectedId, data?.pages])

  const handleCreate = async (values: AnnouncementCreateParameters) => {
    await create(values)
    setIsCreateOpen(false)
  }

  const handleEdit = async (values: AnnouncementCreateParameters) => {
    await update(values)
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
          <p className="font-raleway mb-1 text-xl/6 font-medium">Управление объявлениями</p>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Создать объявление
          </Button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-y-4">
        {data?.pages.map((page, i) => (
          <div key={i} className="flex flex-col gap-y-4">
            {page.data.map(announcement => (
              <div
                key={announcement.id}
                onClick={() => handleCardClick(announcement.id)}
                className="cursor-pointer">
                <AnnouncementCard announcement={announcement} />
              </div>
            ))}
          </div>
        ))}

        {hasNextPage && (
          <div className="flex justify-center">
            <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} variant="outline">
              {isFetchingNextPage ? "Загрузка..." : "Загрузить еще"}
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Создание объявления</DialogTitle>
          </DialogHeader>
          <AnnouncementForm
            defaultValues={defaultAnnouncementParameters}
            onSubmit={handleCreate}
            onEditOpen={setIsEditOpen}
            onListOpen={() => {}}
            selectedId={null}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Редактирование объявления</DialogTitle>
          </DialogHeader>
          <AnnouncementForm
            defaultValues={
              selectedAnnouncement
                ? {
                    message: selectedAnnouncement.message,
                    target: selectedAnnouncement.target ?? {
                      included_grades: [],
                      excluded_grades: [],
                      included_groups: [],
                      excluded_groups: [],
                      included_departments: [],
                      excluded_departments: [],
                    },
                    priority: selectedAnnouncement.priority,
                    is_anonymous: selectedAnnouncement.is_anonymous,
                    is_time_limited: selectedAnnouncement.is_time_limited,
                    available_until: selectedAnnouncement.available_until,
                  }
                : defaultAnnouncementCreateParameters
            }
            onSubmit={handleEdit}
            onEditOpen={setIsEditOpen}
            onListOpen={() => {}}
            selectedId={selectedId}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
