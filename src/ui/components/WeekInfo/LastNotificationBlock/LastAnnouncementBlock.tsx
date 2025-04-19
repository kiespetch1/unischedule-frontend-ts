import { FC, useState } from "react"
import ExpandTriangle from "@assets/expand-triangle.svg?react"
import clsx from "clsx"

export interface LastAnnouncementBlockProps {
  message: string
}

export const LastAnnouncementBlock: FC<LastAnnouncementBlockProps> = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true)
  const contentClass = "font-raleway text-lg text-zinc-950"
  const finalContentClass = clsx(contentClass, !isOpen ? "hidden" : undefined)
  const triangleClass = "transition duration-300 ease-in-out"
  const finalTriangleClass = clsx(triangleClass, isOpen ? "rotate-180" : undefined)

  return (
    <div className="flex flex-col space-y-px">
      <div className="flex flex-row items-center space-x-4">
        <button
          className="flex cursor-pointer flex-row items-center space-x-2"
          onClick={() => setIsOpen(!isOpen)}>
          <div className="font-raleway text-lg font-semibold text-zinc-950">
            Последнее объявление
          </div>
          <ExpandTriangle className={finalTriangleClass} />
        </button>
        <div className="font-raleway cursor-pointer text-lg font-normal text-neutral-500">
          посмотреть другие объявления
        </div>
      </div>
      <div className={finalContentClass}>{message}</div>
    </div>
  )
}
