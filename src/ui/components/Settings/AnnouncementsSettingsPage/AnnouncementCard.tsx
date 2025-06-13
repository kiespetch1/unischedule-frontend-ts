import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/basic/card.tsx"
import { FC } from "react"
import { cn } from "@/lib/utils.ts"
import { AnnouncementModel } from "@/features/classes-schedule/types/classes-types.ts"
import { toReadableDate } from "@/utils/formatters.ts"
import Dot from "@components/common/Dot.tsx"

interface AnnouncementCardProps {
  announcement: AnnouncementModel
  className?: string
}

export const AnnouncementCard: FC<AnnouncementCardProps> = ({ announcement, className }) => {
  const author =
    !announcement.is_anonymous && announcement.created_by
      ? `${announcement.created_by.surname} ${announcement.created_by.name}`
      : "Анонимно"

  const expiryDate =
    announcement.is_time_limited && announcement.available_until
      ? `До ${toReadableDate(announcement.available_until, { useYear: true })}`
      : null

  return (
    <Card className={cn("hover:bg-muted/50 cursor-pointer transition-colors", className)}>
      <CardHeader>
        <CardTitle className="font-raleway text-lg">{announcement.message}</CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1 text-sm">
          <span>{author}</span>
          {expiryDate && (
            <>
              <Dot colorClass={"bg-muted-foreground/50"} />
              <span>{expiryDate}</span>
            </>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
