import { FC, MouseEvent as ReactMouseEvent } from "react"

export interface GroupButtonProps {
  groupName: string
  link?: string
  groupId?: string
  onClick?: (groupId: string, event: ReactMouseEvent<HTMLElement>) => void
}

export const GroupButton: FC<GroupButtonProps> = ({ groupName, link, groupId, onClick }) => {
  const handleClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (onClick && groupId) {
      event.preventDefault()
      onClick(groupId, event)
    }
  }

  const borderClass =
    "border-iateblue box-content flex h-[36px] w-[122px] items-center justify-center rounded-[20px] border-2 bg-zinc-200 no-underline font-raleway text-lg font-semibold"

  return link ? (
    <a href={link} className={borderClass} onClick={handleClick}>
      {groupName}
    </a>
  ) : (
    <button type="button" className={borderClass} onClick={handleClick}>
      {groupName}
    </button>
  )
}
