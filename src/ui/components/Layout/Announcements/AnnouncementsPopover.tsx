import Notifications from "@assets/notification.svg?react"
import { FC, lazy, Suspense, useId, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"

const AnnouncementsList = lazy(
  () => import("@/ui/components/Layout/Announcements/AnnouncementsList.tsx")
)

export interface AnnouncementsPopoverProps {
  open: boolean
  groupId: string
  groupName: string | undefined
  openAnnouncements: () => void
  closeAnnouncements: () => void
}

export const AnnouncementsPopover: FC<AnnouncementsPopoverProps> = ({
  open,
  groupId,
  groupName = "",
  openAnnouncements,
  closeAnnouncements,
}) => {
  const announcementsContainer = useRef<HTMLDivElement>(null)
  const descriptionId = useId()

  return (
    <Dialog open={open} onOpenChange={open => !open && closeAnnouncements()}>
      <DialogTrigger>
        <a
          href="#"
          className="hover:bg-zinc-150 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-xl transition-colors duration-300"
          aria-label="Открыть объявления"
          onClick={e => {
            e.preventDefault()
            openAnnouncements()
          }}>
          <Notifications />
        </a>
      </DialogTrigger>
      <DialogContent id={descriptionId}>
        <DialogDescription
          className="sr-only"
          id={descriptionId}>{`Объявления группы ${groupName}`}</DialogDescription>
        <DialogHeader>
          <DialogTitle>{`Объявления группы ${groupName}`}</DialogTitle>
        </DialogHeader>
        <Suspense
          fallback={
            <>
              <div className="flex flex-col gap-2">
                <p className="font-raleway text-sm"> Загрузка1...</p>
              </div>
            </>
          }>
          <AnnouncementsList groupId={groupId} ref={announcementsContainer} />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
