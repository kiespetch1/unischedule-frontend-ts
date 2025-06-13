import { FC, lazy, Suspense, useId, useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/basic/dialog.tsx"
import { ScrollArea } from "@/ui/basic/scroll-area.tsx"
import { Bell } from "lucide-react"
import { useAuth } from "@/features/auth/context/auth-context.tsx"
import { useLocation } from "react-router-dom"
import { useGetGroupById } from "@/features/classes-schedule/groups/hooks/use-group-query.ts"

const AnnouncementsList = lazy(
  () => import("@/ui/components/Layout/Announcements/AnnouncementsList.tsx")
)

export interface AnnouncementsPopoverProps {
  open: boolean
  groupName: string | undefined
  onOpen: () => void
  onClose: () => void
}

const DEFAULT_GROUP_ID = "d0b8f7e8-c7a9-4f0a-8b1f-07e5a9a2c1e4"

export const AnnouncementsPopover: FC<AnnouncementsPopoverProps> = ({
  open,
  groupName = "",
  onOpen,
  onClose,
}) => {
  const announcementsContainer = useRef<HTMLDivElement>(null)
  const descriptionId = useId()
  const { authState } = useAuth()
  const location = useLocation()
  const currentGroupId = location.pathname.split("/")[2]

  const [currentGroup, setCurrentGroup] = useState(() => {
    if (authState.isAuthenticated) {
      return authState.userData!.group_id
    }
    if (currentGroupId) {
      return currentGroupId
    }
    return DEFAULT_GROUP_ID
  })

  const { data: currentGroupData } = useGetGroupById({ id: currentGroup })

  const canSwitchGroups =
    authState.isAuthenticated && currentGroupId && currentGroupId !== authState.userData!.group_id

  const handleSwitchGroup = () => {
    setCurrentGroup(prev =>
      prev === authState.userData!.group_id ? currentGroupId : authState.userData!.group_id
    )
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setCurrentGroup(currentGroupId)
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <a
          href="#"
          className="hover:bg-zinc-150 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-xl transition-colors duration-300"
          aria-label="Открыть объявления"
          onClick={e => {
            e.preventDefault()
            onOpen()
          }}>
          <Bell width={32} height={32} />
        </a>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] w-[80vw] max-w-2xl overflow-hidden" id={descriptionId}>
        <DialogDescription
          className="sr-only"
          id={
            descriptionId
          }>{`Объявления группы ${currentGroupData?.name || groupName}`}</DialogDescription>
        <DialogHeader>
          <div className="flex items-center justify-start gap-x-2">
            <DialogTitle className="flex flex-row gap-1">
              <span className="font-raleway text-bold">{`Объявления группы ${currentGroupData?.name || groupName}`}</span>
            </DialogTitle>
            {canSwitchGroups && (
              <button
                onClick={handleSwitchGroup}
                className="font-raleway text-muted-foreground cursor-pointer text-lg">
                {currentGroup === authState.userData!.group_id
                  ? "показать объявления текущей группы"
                  : "показать объявления моей группы"}
              </button>
            )}
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(80vh-100px)] w-full">
          <Suspense
            fallback={
              <>
                <p className="font-raleway text-sm"> Загрузка...</p>
              </>
            }>
            <AnnouncementsList groupId={currentGroup} ref={announcementsContainer} />
          </Suspense>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
