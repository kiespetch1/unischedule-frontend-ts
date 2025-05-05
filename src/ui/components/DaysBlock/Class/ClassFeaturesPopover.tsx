import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx"
import { Button } from "@/components/ui/button.tsx"
import EmptyWeekType from "@assets/empty-week-type.svg?react"
import FirstGroup from "@assets/first-group.svg?react"
import SecondGroup from "@assets/second-group.svg?react"
import EvenWeek from "@assets/even-week.svg?react"
import OddWeek from "@assets/odd-week.svg?react"
import { Combobox } from "@/components/ui/combobox.tsx"
import { WeekType, Subgroup } from "@/features/classes-schedule/types/classes-types.ts"
import { Label } from "@/components/ui/label.tsx"
import { FC } from "react"
import { TooltipWrapper } from "../../common/TooltipWrapper"
import { SubgroupOptions, WeekTypeOptions } from "@components/DaysBlock/Class/combobox-options.ts"

export interface ClassFeaturesPopoverProps {
  weekType: WeekType
  subgroup: Subgroup
  onWeekTypeChange: (weekType: WeekType) => void
  onSubgroupChange: (subgroup: Subgroup) => void
}

export const ClassFeaturesPopover: FC<ClassFeaturesPopoverProps> = ({
  weekType,
  subgroup,
  onWeekTypeChange,
  onSubgroupChange,
}) => {
  return (
    <Popover>
      <TooltipWrapper message="Изменить тип недели и подгруппу">
        <PopoverTrigger asChild>
          <Button
            className="rounded-full"
            variant="outline"
            size={weekType !== "every" && subgroup !== "none" ? "thinOval" : "thinCircle"}
            type="button">
            <span className="flex w-full items-center justify-around">
              {weekType === "every" && subgroup === "none" && <EmptyWeekType />}
              {weekType === "odd" && <OddWeek className="animate-fade-in-scale" />}
              {weekType === "even" && <EvenWeek className="animate-fade-in-scale" />}
              {subgroup === "first" && <FirstGroup className="animate-fade-in-scale" />}
              {subgroup === "second" && <SecondGroup className="animate-fade-in-scale" />}
            </span>
          </Button>
        </PopoverTrigger>
      </TooltipWrapper>
      <PopoverContent>
        <div className="bg-popover text-popover-foreground flex h-full w-full flex-col gap-2 overflow-hidden rounded-md">
          <div>
            <Label className="font-raleway text-lg">Тип недели</Label>
            <Combobox
              className="font-raleway text-lg font-normal"
              useSearch={false}
              options={WeekTypeOptions}
              widthClass="w-[130px]"
              value={weekType}
              onChange={onWeekTypeChange}
            />
          </div>
          <div>
            <Label className="font-raleway text-lg">Подгруппа</Label>
            <Combobox
              className="font-raleway text-lg font-normal"
              useSearch={false}
              options={SubgroupOptions}
              widthClass="w-[130px]"
              value={subgroup}
              onChange={onSubgroupChange}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
