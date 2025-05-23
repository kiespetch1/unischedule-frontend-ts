import { forwardRef } from "react"
import { Separator } from "@/components/ui/separator.tsx"
import { toReadableDate } from "@/utils/formatters.ts"
import Dot from "@components/Dot.tsx"
import { useGetAnnouncements } from "@/features/announcements/hooks/use-get-announcements.ts"
import { Button } from "@/components/ui/button"

export interface NotificationsListProps {
  groupId: string
}

const AnnouncementsList = forwardRef<HTMLDivElement, NotificationsListProps>(({ groupId }, ref) => {
  const {
    data: { pages } = { pages: [] },
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetAnnouncements({ groupId, limit: 9 })

  const announcements = pages.flatMap(page => page.data)
  if (!isLoading && announcements.length === 0) {
    return (
      <>
        <div className="flex flex-col gap-2">
          <p className="font-raleway text-sm"> Здесь пока ничего нет...</p>
        </div>
      </>
    )
  }

  return (
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
      {hasNextPage && (
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            fetchNextPage()
          }}>
          Показать более старые
        </Button>
      )}
      {isFetchingNextPage && (
        <div className="flex justify-center">
          <div className="loader" />
        </div>
      )}
    </div>
  )
})

export default AnnouncementsList
