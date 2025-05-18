import { FC, useState } from "react"
import ExpandTriangle from "@assets/expand-triangle.svg?react"
import { AnnouncementSkeleton } from "./AnnouncementSkeleton"
import { AnnouncementBlockModel } from "@/features/classes-schedule/types/classes-types.ts"
import { useDialog } from "@/contexts/dialog-context.tsx"
import { cn } from "@/lib/utils.ts"

export interface AnnouncementBlockProps {
  blockData: AnnouncementBlockModel | undefined
  loading: boolean
}

export const AnnouncementBlock: FC<AnnouncementBlockProps> = ({ blockData, loading }) => {
  const [isOpen, setIsOpen] = useState(true)
  const { openAnnouncements } = useDialog()

  if (loading) {
    return <AnnouncementSkeleton />
  }

  if (!blockData?.last && !blockData?.last_time_limited) {
    return null
  }

  return (
    <div className="flex flex-col gap-px">
      <div className="flex flex-row items-center gap-4">
        <button
          className="flex cursor-pointer flex-row items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}>
          <div className="font-raleway text-lg font-semibold text-zinc-950">
            Последние объявления
          </div>
          <ExpandTriangle
            className={cn("transition duration-300 ease-in-out", isOpen && "rotate-180")}
          />
        </button>
        <button
          className="font-raleway cursor-pointer text-lg font-normal text-neutral-500"
          onClick={openAnnouncements}>
          посмотреть другие объявления
        </button>
      </div>
      <div className="flex flex-col gap-px">
        <div className="flex flex-row gap-2">
          {blockData.last?.message && (
            <span className={cn("font-raleway text-lg text-zinc-950", !isOpen && "hidden")}>
              {blockData.last?.message}
            </span>
          )}
          {blockData.last?.created_by && !blockData?.last.is_anonymous && (
            <span
              className={cn("font-raleway text-lg italic text-neutral-400", !isOpen && "hidden")}>
              {`— ${blockData.last?.created_by.surname} ${blockData.last?.created_by.name}`}
            </span>
          )}
        </div>

        <div className="flex flex-row gap-2">
          {blockData.last_time_limited?.message && (
            <span className={cn("font-raleway text-lg text-zinc-950", !isOpen && "hidden")}>
              {blockData.last_time_limited?.message}
            </span>
          )}
          {blockData.last_time_limited?.created_by &&
            !blockData?.last_time_limited.is_anonymous && (
              <span
                className={cn("font-raleway text-lg italic text-neutral-400", !isOpen && "hidden")}>
                {`— ${blockData.last_time_limited?.created_by.surname} ${blockData.last_time_limited?.created_by.name}`}
              </span>
            )}
        </div>
      </div>
    </div>
  )
}
