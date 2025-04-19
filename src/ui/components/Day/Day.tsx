import { FC } from "react"
import { DayModel, DayOfWeek } from "@/features/classes-schedule/types/classes-types.ts"
import Dot from "@components/Dot.tsx"

export interface DayProps {
  dayData: DayModel | undefined
}

export const Day: FC<DayProps> = ({ dayData }) => {
  return (
    <div className="flex flex-col">
      <DayHeader
        dayOfWeek={(dayData && dayData.day_of_week) || DayOfWeek.Monday}
        classesCount={dayData?.classes?.length || 0}
      />
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
    <div className="bg-iateblue flex h-[49] w-[600] flex-row items-center justify-start space-x-4 rounded-t-sm">
      <div className="font-raleway text-2xl font-bold text-zinc-100">
        {getRussianDayName(dayOfWeek)}
      </div>
      <Dot colorClass={"bg-zinc-100"} sizeClass={"w-2 h-2"} />
      <div className="font-raleway font-light text-zinc-100">
        {classesCount} {getNoun(classesCount, ["пара", "пары", "пар"])}
      </div>
    </div>
  )
}
