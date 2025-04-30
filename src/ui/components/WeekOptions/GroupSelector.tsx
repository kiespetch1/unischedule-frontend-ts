import { FC } from "react"
import Switch from "@assets/switch.svg?react"
import { TooltipWrapper } from "@components/common/TooltipWrapper.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"

export interface GroupSelectorProps {
  labelText: string
  groupName?: string
  isLoading?: boolean
}

export const GroupSelector: FC<GroupSelectorProps> = ({ labelText, groupName, isLoading }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="font-raleway text-base font-normal">{labelText}</div>
      <div className="flex min-h-[47px] flex-row items-center gap-1">
        {isLoading ? (
          <Skeleton className="h-[47px] w-[125px]" />
        ) : (
          <div className="font-raleway text-3xl font-semibold">{groupName}</div>
        )}
        <TooltipWrapper message="Сменить группу" delayDuration={900}>
          <a href="/groups" aria-label="Сменить группу">
            <Switch className="rotate-45" width="20" height="20" color="#757575" />
          </a>
        </TooltipWrapper>
      </div>
    </div>
  )
}
