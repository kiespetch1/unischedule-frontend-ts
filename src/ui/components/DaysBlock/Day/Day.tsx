import { FC, ReactNode, useState } from "react"
import { ClassModel, DayModel, DayOfWeek } from "@/features/classes-schedule/types/classes-types.ts"
import Add from "@assets/add.svg?react"
import { Class } from "@components/DaysBlock/Class/Class.tsx"
import { useToggle } from "@/hooks/use-toggle.ts"
import clsx from "clsx"
import { DayHeader } from "@components/DaysBlock/Day/DayHeader.tsx"
import { defaultClass } from "@/utils/default-entities.ts"
import { BlurElement } from "@components/DaysBlock/BlurElement.tsx"
import { sortByStartTime } from "@components/DaysBlock/formatters.ts"

export interface DayProps {
  dayData: DayModel | undefined
  groupId?: string
}

export const Day: FC<DayProps> = ({ dayData, groupId }) => {
  const classes: ClassModel[] = dayData?.classes ?? [defaultClass]
  const [isEditing, setIsEditing] = useToggle(false)
  const [activeClassIndex, setActiveClassIndex] = useState<number | undefined>(undefined)
  const handleAddClass = () => {}

  if (isEditing) {
    return (
      <>
        <div className="group relative flex flex-col *:z-20">
          <DayHeader
            dayOfWeek={(dayData && dayData.day_of_week) || DayOfWeek.Monday}
            classesCount={dayData?.classes?.length || 0}
            editing={isEditing}
            onEditing={setIsEditing}
            onActiveChange={setActiveClassIndex}
          />
          <ClassesList
            classes={classes}
            editing={isEditing}
            activeIndex={activeClassIndex}
            onActiveChange={setActiveClassIndex}
            groupId={groupId}
          />
          <EndBlock editing={isEditing} onClassAdd={handleAddClass} />
        </div>
        <BlurElement />
      </>
    )
  }

  return (
    <div className="group flex flex-col">
      <DayHeader
        dayOfWeek={(dayData && dayData.day_of_week) || DayOfWeek.Monday}
        classesCount={dayData?.classes?.length || 0}
        editing={isEditing}
        onEditing={setIsEditing}
        onActiveChange={setActiveClassIndex}
      />
      <ClassesList
        classes={classes}
        editing={isEditing}
        activeIndex={activeClassIndex}
        onActiveChange={setActiveClassIndex}
      />
      <EndBlock editing={isEditing} />
    </div>
  )
}

interface ClassesListProps {
  classes: ClassModel[]
  editing: boolean
  activeIndex: number | undefined
  onActiveChange: (index: number | undefined) => void
  groupId?: string
}

const ClassesList: FC<ClassesListProps> = ({
  classes,
  editing,
  activeIndex,
  onActiveChange,
  groupId,
}) => {
  const renderClasses = (): ReactNode => {
    if (classes.length === 0) {
      return <Class isWeekend={true} />
    }

    const sorted = sortByStartTime(classes)

    return (
      <>
        {sorted.map((classData, index) => (
          <Class
            key={classData.id}
            data={classData}
            isFirst={index === 0}
            isWeekend={false}
            editing={editing && index === activeIndex}
            clickable={editing && index !== activeIndex}
            onClick={() => editing && onActiveChange?.(index)}
            onActiveChange={onActiveChange}
            groupId={groupId}
          />
        ))}
      </>
    )
  }

  return <>{renderClasses()}</>
}

interface EndBlockProps {
  editing: boolean
  onClassAdd?: () => void
}

const EndBlock: FC<EndBlockProps> = ({ editing, onClassAdd }) => {
  const wrapperClass = clsx(
    "flex items-center justify-center rounded-sm",
    "transition-all duration-200 w-[600px]",
    editing ? "h-8 bg-zinc-200" : "h-2 bg-zinc-150"
  )

  const iconClass = clsx(
    "transition-opacity",
    editing ? "opacity-100 duration-200 delay-150" : "opacity-0 duration-0 delay-0"
  )

  return (
    <div onClick={onClassAdd} className={wrapperClass}>
      <div className={iconClass}>
        <Add />
      </div>
    </div>
  )
}
