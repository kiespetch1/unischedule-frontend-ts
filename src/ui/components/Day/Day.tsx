import { FC, ReactNode } from "react"
import { DayModel, DayOfWeek } from "@/features/classes-schedule/types/classes-types.ts"
import Dot from "@components/Dot.tsx"
import Edit from "@assets/edit.svg?react"
import { TooltipWrapper } from "@/components/ui/TooltipWrapper.tsx"
import { Class } from "@components/Day/Class.tsx"
import { getPluralForm, getRussianDayName } from "@/utils/formatters.ts"

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
  const getClassesCount = (count: number) => {
    if (count == 0) {
      return "выходной"
    } else {
      return `${count} ${getPluralForm(count, ["пара", "пары", "пар"])}`
    }
  }

  return (
    <div className="bg-iateblue flex h-[49px] w-[600px] flex-row items-center justify-between space-x-4 rounded-t-sm px-5">
      <div className="flex flex-row items-center justify-start space-x-4">
        <div className="font-raleway text-[27px] font-bold text-zinc-100">
          {getRussianDayName(dayOfWeek)}
        </div>
        <Dot colorClass={"bg-zinc-100"} sizeClass={"w-1 h-1"} />
        <div className="font-raleway text-[27px] font-light text-zinc-100">
          {getClassesCount(classesCount)}
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
      <Class key={classData.id} data={classData} isFirst={index === 0} isWeekend={false} />
    ))
  }

  return <>{renderClasses()}</>
}

const EndBlock = () => {
  return <div className="bg-zinc-150 flex h-2 w-[600px] rounded-full"></div>
}
