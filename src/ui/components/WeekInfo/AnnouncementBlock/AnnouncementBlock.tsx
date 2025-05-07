import { FC, useState } from "react"
import ExpandTriangle from "@assets/expand-triangle.svg?react"
import clsx from "clsx"
import { AnnouncementSkeleton } from "./AnnouncementSkeleton"
import { AnnouncementBlockModel } from "@/features/classes-schedule/types/classes-types.ts"
import { useDialog } from "@/contexts/dialog-context.tsx"

export interface AnnouncementBlockProps {
  blockData: AnnouncementBlockModel | undefined
  loading: boolean
}

export const AnnouncementBlock: FC<AnnouncementBlockProps> = ({ blockData, loading }) => {
  const [isOpen, setIsOpen] = useState(true)
  const { openAnnouncements } = useDialog()
  
  const contentClass = "font-raleway text-lg text-zinc-950"
  const finalContentClass = clsx(contentClass, !isOpen ? "hidden" : undefined)
  const triangleClass = "transition duration-300 ease-in-out"
  const finalTriangleClass = clsx(triangleClass, isOpen ? "rotate-180" : undefined)

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
          <ExpandTriangle className={finalTriangleClass} />
        </button>
        <button 
          className="font-raleway cursor-pointer text-lg font-normal text-neutral-500"
          onClick={openAnnouncements}
        >
          посмотреть другие объявления
        </button>
      </div>
      <div className="flex flex-col gap-px">
        {blockData.last?.message && (
          <div className={finalContentClass}>{blockData.last?.message}</div>
        )}
        {blockData.last_time_limited?.message && (
          <div className={finalContentClass}>{blockData.last_time_limited?.message}</div>
        )}
      </div>
    </div>
  )
}
