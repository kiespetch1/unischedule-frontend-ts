import { forwardRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { toReadableDate } from "@/utils/formatters.ts"
import Dot from "@components/Dot.tsx"
import { usePaginationRequestParams } from "@/features/announcements/hooks/use-pagination-request-params.ts"
import { useGetAnnouncements } from "@/features/announcements/hooks/use-get-announcements.ts"

export interface NotificationsListProps {
  groupId: string
}

const AnnouncementsList = forwardRef<HTMLDivElement, NotificationsListProps>(({ groupId }, ref) => {
  const { paginationParams } = usePaginationRequestParams(6)
  const { data: { data: announcements = [] } = {}, isLoading } = useGetAnnouncements({
    groupId,
    ...paginationParams,
  })

  if (!isLoading && announcements.length === 0) {
    return <>
      <div className="flex flex-col gap-2">
        <p className="font-raleway text-sm"> Загрузка2...</p>
      </div>
    </>
  }

  return (
    <ScrollArea>
      <div className="flex flex-col gap-2" ref={ref}>
        {announcements.map(announcement => (
          <div key={announcement.id} className="flex flex-col items-start gap-2">
            <Separator aria-orientation="horizontal" />
            <div className="flex flex-row items-center gap-2">
              <div className="font-raleway text-sm text-neutral-500">
                {toReadableDate(announcement.created_at)}
              </div>
              {announcement.created_by && (
                <>
                  <Dot sizeClass="w-1 h-1" colorClass="bg-neutral-500" />
                  <span className="font-raleway text-sm text-neutral-500">
                    {`${announcement.created_by.name} ${announcement.created_by.surname}`}
                  </span>
                </>
              )}
            </div>
            <div className="font-raleway text-base">{announcement.message}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
})

export default AnnouncementsList
