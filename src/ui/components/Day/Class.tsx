import { FC } from "react"
import clsx from "clsx"
import Dot from "@components/Dot.tsx"
import FirstGroup from "@assets/first-group.svg?react"
import SecondGroup from "@assets/second-group.svg?react"
import EvenWeek from "@assets/even-week.svg?react"
import OddWeek from "@assets/odd-week.svg?react"
import { ClassModel, Subgroup, WeekType } from "@/features/classes-schedule/types/classes-types.ts"
import { trimEndChars, trimStartChars } from "@/utils/formatters.ts"
import { TooltipWrapper } from "@/components/ui/TooltipWrapper.tsx"
import { getRussianClassTypeName, getRussianLocationTypeName } from "@components/Day/formatters.ts"

export interface ClassProps {
  isFirst?: boolean
  isWeekend: boolean
  data?: ClassModel
}

export const Class: FC<ClassProps> = ({ isFirst = false, isWeekend, data }) => {
  const baseBlockClass =
    "flex flex-row items-center justify-between p-1 mb-[6px] w-[600px] h-[133px] bg-zinc-120 rounded-b-sm px-8"
  const finalBaseBlockClass = clsx(baseBlockClass, !isFirst ? "rounded-t-sm" : "")

  const getIrlLocationTooltipMessage = (locationName: string) => {
    const building = trimStartChars(locationName, 1)
    const floor = locationName.substring(2, 3)

    return `${building} корпус, ${floor} этаж`
  }

  if (isWeekend) {
    return (
      <div className={finalBaseBlockClass}>
        <span className="font-raleway w-full text-center text-3xl font-normal">Выходной день</span>
      </div>
    )
  }

  if (!data) {
    throw new Error("Class data is undefined")
  }
  const classData: ClassModel = data

  return (
    <div className={finalBaseBlockClass}>
      <div className="box-content flex h-full flex-col items-start justify-evenly">
        <div className="flex flex-row items-center space-x-4">
          <span className="font-raleway text-2xl font-semibold">
            {trimEndChars(classData.started_at, 3)} - {trimEndChars(classData.finished_at, 3)}
          </span>
          <Dot sizeClass={"w-1 h-1"} colorClass={"bg-black"} />
          <span className="font-raleway text-lg font-normal">
            {getRussianClassTypeName(classData.type)}
          </span>
          <IconsSection weekType={classData.week_type} subgroup={classData.subgroup} />
        </div>
        <span className="font-raleway text-lg/5 font-normal">{classData.name}</span>
        <TooltipWrapper
          message={classData.teacher.full_name}
          disabled={!classData.teacher.full_name}>
          <span className="font-raleway pt-px text-sm font-normal">{classData.teacher.name}</span>
        </TooltipWrapper>
      </div>
      <div className="flex h-3/5 flex-col items-center justify-evenly">
        <span className="font-raleway text-lg font-normal">
          {getRussianLocationTypeName(classData.location.type)}
        </span>
        <TooltipWrapper
          message={getIrlLocationTooltipMessage(classData.location.name)}
          disabled={classData.location.name.length !== 5}>
          <span className="font-raleway text-lg font-bold">{classData.location.name}</span>
        </TooltipWrapper>
      </div>
    </div>
  )
}

interface IconsSectionProps {
  weekType: WeekType
  subgroup: Subgroup
}

const IconsSection: FC<IconsSectionProps> = ({ weekType, subgroup }) => {
  return (
    <div className="flex flex-row items-center justify-end space-x-4">
      {(weekType !== "every" || subgroup !== "none") && (
        <Dot sizeClass={"w-1 h-1"} colorClass={"bg-black"} />
      )}
      {weekType === "even" && (
        <>
          <TooltipWrapper message="Четная неделя">
            <EvenWeek width="25px" height="25px" />
          </TooltipWrapper>
        </>
      )}
      {weekType === "odd" && (
        <>
          <TooltipWrapper message="Нечетная неделя">
            <OddWeek width="25px" height="25px" />
          </TooltipWrapper>
        </>
      )}
      {subgroup === "first" && (
        <>
          <TooltipWrapper message="Первая подгруппа">
            <FirstGroup width="25px" height="25px" />
          </TooltipWrapper>
        </>
      )}
      {subgroup === "second" && (
        <>
          <TooltipWrapper message="Вторая подгруппа">
            <SecondGroup width="25px" height="25px" />
          </TooltipWrapper>
        </>
      )}
    </div>
  )
}
