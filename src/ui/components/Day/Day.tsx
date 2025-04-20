import { FC, ReactNode } from "react"
import { DayModel, DayOfWeek } from "@/features/classes-schedule/types/classes-types.ts"
import Dot from "@components/Dot.tsx"
import Edit from "@assets/edit.svg?react"
import { TooltipWrapper } from "@/components/ui/TooltipWrapper.tsx"
import { Class } from "@components/Day/Class.tsx"

export interface DayProps {
  dayData: DayModel | undefined
}

export const Day: FC<DayProps> = ({ dayData }) => {
  return (
    <div className="group flex flex-col">
      <DayHeader
        dayOfWeek={(dayData && dayData.day_of_week) || DayOfWeek.Monday}
        classesCount={dayData?.classes?.length || 0}
      />
      <ClassesList dayData={dayData} />
      <EndBlock />
    </div>
  )
}

interface DayHeaderProps {
  dayOfWeek: DayOfWeek
  classesCount: number
}

export const DayHeader: FC<DayHeaderProps> = ({ dayOfWeek, classesCount }) => {
  const getRussianDayName = (dayName: DayOfWeek) => {
    switch (dayName) {
      case DayOfWeek.Monday:
        return "Понедельник"
      case DayOfWeek.Tuesday:
        return "Вторник"
      case DayOfWeek.Wednesday:
        return "Среда"
      case DayOfWeek.Thursday:
        return "Четверг"
      case DayOfWeek.Friday:
        return "Пятница"
      case DayOfWeek.Saturday:
        return "Суббота"
    }
  }

  const getNoun = (value: number, words: string[]) => {
    value = Math.abs(value) % 100
    const num = value % 10
    if (value > 10 && value < 20) return words[2]
    if (num > 1 && num < 5) return words[1]
    if (num === 1) return words[0]
    return words[2]
  }

  return (
    <div className="bg-iateblue flex h-[49px] w-[600px] flex-row items-center justify-between space-x-4 rounded-t-sm px-5">
      <div className="flex flex-row items-center justify-start space-x-4">
        <div className="font-raleway text-[27px] font-bold text-zinc-100">
          {getRussianDayName(dayOfWeek)}
        </div>
        <Dot colorClass={"bg-zinc-100"} sizeClass={"w-1 h-1"} />
        <div className="font-raleway text-[27px] font-light text-zinc-100">
          {classesCount} {getNoun(classesCount, ["пара", "пары", "пар"])}
        </div>
      </div>
      <TooltipWrapper message="Редактировать день">
        <button className="cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Edit />
        </button>
      </TooltipWrapper>
    </div>
  )
}

interface ClassesListProps {
  dayData: DayModel | undefined
}

const ClassesList: FC<ClassesListProps> = ({ dayData }) => {
  const renderClasses = (): ReactNode => {
    const classes = dayData?.classes ?? []

    if (classes.length === 0) {
      return <Class isWeekend={true} />
    }

    return classes.map((classData, index) => (
      <Class key={classData.id} isFirst={index === 0} isWeekend={false} />
    ))
  }

  return <>{renderClasses()}</>
}

const EndBlock = () => {
  return <div className="bg-zinc-150 flex h-2 w-[600px] rounded-full"></div>
}
