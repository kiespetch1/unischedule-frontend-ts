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
import { ScrollArea } from "@/components/ui/scroll-area"

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
      <DialogContent
        className="w-[80vw] max-w-2xl max-h-[80vh] overflow-hidden"
        id={descriptionId}
      >
      <DialogDescription
          className="sr-only"
          id={descriptionId}>{`Объявления группы ${groupName}`}</DialogDescription>
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-1">
            <span className="font-raleway text-bold">Объявления группы</span>
            <button
              type="button"
              onClick={() => {}}
              className="font-raleway text-semibold text-blue-950 underline cursor-pointer">{`${groupName}`}</button>
          </DialogTitle>
        </DialogHeader>
          <ScrollArea className="w-full max-h-[calc(80vh-100px)]">
            <Suspense
              fallback={
                <>
                  <p className="font-raleway text-sm"> Загрузка...</p>
                </>
              }>
              <AnnouncementsList groupId={groupId} ref={announcementsContainer} />
            </Suspense>
          </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
