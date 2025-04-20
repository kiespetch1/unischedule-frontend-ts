import { FC } from "react"
import Switch from "@assets/switch.svg?react"
import { TooltipWrapper } from "@/components/ui/TooltipWrapper.tsx"

export interface GroupSelectorProps {
  labelText: string
  groupText: string
}

export const GroupSelector: FC<GroupSelectorProps> = ({ labelText, groupText }) => {
  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="font-raleway text-base font-normal">{labelText}</div>
      <div className="flex min-h-[47px] flex-row items-center space-x-1">
        <div className="font-raleway text-3xl font-semibold">{groupText}</div>
        <TooltipWrapper message="Сменить группу" delayDuration={900}>
          <a href="/groups" aria-label="Сменить группу">
            <Switch className="rotate-45" width="20" height="20" color="#757575" />
          </a>
        </TooltipWrapper>
      </div>
    </div>
  )
}
