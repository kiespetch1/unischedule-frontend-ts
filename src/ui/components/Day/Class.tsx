import { FC, useState } from "react"
import clsx from "clsx"
import Dot from "@components/Dot.tsx"
import FirstGroup from "@assets/first-group.svg?react"
import SecondGroup from "@assets/second-group.svg?react"
import EvenWeek from "@assets/even-week.svg?react"
import OddWeek from "@assets/odd-week.svg?react"
import { Subgroup, WeekType } from "@/features/classes-schedule/types/classes-types.ts"

export interface ClassProps {
  isFirst?: boolean
  isWeekend: boolean
}

export const Class: FC<ClassProps> = ({ isFirst = false, isWeekend }) => {
  const [weekType] = useState<WeekType>("every")
  const [subgroup] = useState<Subgroup>("none")
  const baseBlockClass =
    "flex flex-row items-center justify-between p-1 mb-[6px] w-[600px] h-[133px] bg-zinc-120 rounded-b-sm px-8"
  const finalBaseBlockClass = clsx(baseBlockClass, !isFirst ? "rounded-t-sm" : "")

  if (isWeekend) {
    return (
      <div className={finalBaseBlockClass}>
        <span className="font-raleway w-full text-center text-3xl font-normal">Выходной день</span>
      </div>
    )
  }

  return (
    <div className={finalBaseBlockClass}>
      <div className="box-content flex h-full flex-col items-start justify-evenly">
        <div className="flex flex-row items-center space-x-4">
          <span className="font-raleway text-2xl font-semibold">9:00 - 10:45</span>
          <Dot sizeClass={"w-1 h-1"} colorClass={"bg-black"} />
          <span className="font-raleway text-lg font-normal">Практика</span>
          <IconsSection weekType={weekType} subgroup={subgroup} />
        </div>
        <span className="font-raleway text-lg/5 font-normal">Физическая культура</span>
        <span className="font-raleway pt-px text-sm font-normal">Подвысоцкий Р. Г.</span>
      </div>
      <div className="flex h-3/5 flex-col items-center justify-evenly">
        <span className="font-raleway text-lg font-normal">Очно</span>
        <span className="font-raleway text-lg font-bold">2-345</span>
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
      {weekType === "even" && <EvenWeek width="25px" height="25px" />}
      {weekType === "odd" && <OddWeek width="25px" height="25px" />}
      {subgroup === "first" && <FirstGroup width="25px" height="25px" />}
      {subgroup === "second" && <SecondGroup width="25px" height="25px" />}
    </div>
  )
}
