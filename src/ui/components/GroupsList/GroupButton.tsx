import { FC } from "react"

export interface GroupButtonProps {
  groupName: string
  link: string
}

export const GroupButton: FC<GroupButtonProps> = ({ groupName, link }) => {
  return (
    <div className="border-iateblue box-content flex h-[36px] w-[122px] items-center justify-center rounded-[20px] border-2 bg-zinc-200 no-underline">
      <a href={link} className="group-button">
        <div className="font-raleway text-lg font-semibold">{groupName}</div>
      </a>
    </div>
  )
}
