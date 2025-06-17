import { FC, ReactNode, useState } from "react"
import {
  ClassModel,
  DayModel,
  DayOfWeek,
  GroupModel,
} from "@/features/classes-schedule/types/classes-types.ts"
import Add from "@assets/add.svg?react"
import { Class } from "@components/DaysBlock/Class/Class.tsx"
import { useToggle } from "@/hooks/use-toggle.ts"
import clsx from "clsx"
import { DayHeader } from "@components/DaysBlock/Day/DayHeader.tsx"
import { defaultClass, defaultDay, defaultId } from "@/utils/default-entities.ts"
import { BlurElement } from "@components/DaysBlock/BlurElement.tsx"
import { sortByStartTime } from "@components/DaysBlock/formatters.ts"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Button } from "@/ui/basic/button.tsx"
import { getWarningToastSettings } from "@/lib/toast-settings.tsx"
import {
  useClearClassesByDayId,
  useCopyClasses,
} from "@/features/classes-schedule/classes/hooks/use-class-query.ts"

export interface DayProps {
  dayData: DayModel | undefined
  groupId?: string
  globalShowAllClasses?: boolean
  onGlobalShowAllClassesChange?: (show: boolean) => void
}

export const Day: FC<DayProps> = ({
  dayData,
  groupId = "",
  globalShowAllClasses,
  onGlobalShowAllClassesChange,
}) => {
  const day: DayModel = dayData ?? defaultDay
  const classes: ClassModel[] = dayData?.classes ?? [defaultClass]
  const [isEditing, setIsEditing] = useToggle(false)
  const [localShowAllClasses, setLocalShowAllClasses] = useState(false)
  const [activeClassIndex, setActiveClassIndex] = useState<number | undefined>(undefined)
  const queryClient = useQueryClient()
  const { mutateAsync: copyClasses } = useCopyClasses({ dayId: day.id, groupId: groupId })
  const { mutateAsync: clearClasses } = useClearClassesByDayId({ dayId: day.id, groupId: groupId })

  const visibleClasses = classes.filter(x => !x.is_cancelled && !x.is_hidden)
  const hiddenClasses = classes.filter(x => !x.is_cancelled && x.is_hidden)

  const showAllClasses = globalShowAllClasses ?? localShowAllClasses

  const handleShowAllClassesChange = (show: boolean) => {
    if (onGlobalShowAllClassesChange) {
      onGlobalShowAllClassesChange(show)
    } else {
      setLocalShowAllClasses(show)
      toast(
        show
          ? "Скрытые пары теперь отображаются для этого дня"
          : "Скрытые пары теперь скрыты для этого дня",
        getWarningToastSettings()
      )
    }
  }

  const handleAddClass = (weekId: string, dayId: string) => {
    queryClient.setQueryData<GroupModel>(["group", groupId], oldGroup => {
      if (!oldGroup) return oldGroup
      return {
        ...oldGroup,
        weeks: oldGroup.weeks.map(w => {
          if (w.id !== weekId) return w

          return {
            ...w,
            days: w.days.map(d => {
              if (d.id !== dayId) return d

              const existing = d.classes ?? []
              return { ...d, classes: [...existing, defaultClass] }
            }),
          }
        }),
      }
    })
  }

  const handleClearUnsavedClasses = (weekId: string, dayId: string, forced = false) => {
    const groupData = queryClient.getQueryData<GroupModel>(["group", groupId])
    if (!groupData) return

    const hasUnsaved = groupData.weeks.some(week =>
      week.days.some(day => (day.classes ?? []).some(cls => cls.id === defaultId))
    )

    if (!hasUnsaved) return

    queryClient.setQueryData<GroupModel>(["group", groupId], prevGroup => {
      if (!prevGroup) return prevGroup

      return {
        ...prevGroup,
        weeks: prevGroup.weeks.map(w =>
          w.id !== weekId
            ? w
            : {
                ...w,
                days: w.days.map(d =>
                  d.id !== dayId
                    ? d
                    : { ...d, classes: (d.classes ?? []).filter(cls => cls.id !== defaultId) }
                ),
              }
        ),
      }
    })

    if (forced) {
      toast.success("Пара успешно удалена")
    } else {
      toast(
        "Несохраненные пары были очищены при выходе из режима редактирования",
        getWarningToastSettings()
      )
    }
  }

  if (isEditing) {
    return (
      <>
        <div className="group relative flex flex-col items-center *:z-20">
          <DayHeader
            dayOfWeek={(dayData && dayData.day_of_week) || DayOfWeek.Monday}
            classesCount={visibleClasses.length}
            hiddenClassesCount={hiddenClasses.length}
            editing={isEditing}
            showAllClasses={showAllClasses}
            onShowAllClassesChange={handleShowAllClassesChange}
            onEditing={setIsEditing}
            onActiveChange={setActiveClassIndex}
            onEditingExit={() => handleClearUnsavedClasses(day.week_id, day.id)}
            onClassesCopy={copyClasses}
            onClassesClear={clearClasses}
          />
          <ClassesList
            classes={classes}
            editing={isEditing}
            activeIndex={activeClassIndex}
            onActiveChange={setActiveClassIndex}
            groupId={groupId}
            dayId={day.id}
            showAllClasses={showAllClasses}
            onUnsavedDelete={() => handleClearUnsavedClasses(day.week_id, day.id, true)}
          />
          <EndBlock
            editing={isEditing}
            onClassAdd={() => handleAddClass(day.week_id, day.id)}
            disabled={dayData?.classes?.find(x => x.id === defaultId) !== undefined}
          />
        </div>
        <BlurElement />
      </>
    )
  }

  return (
    <div className="group flex flex-col">
      <DayHeader
        dayOfWeek={(dayData && dayData.day_of_week) || DayOfWeek.Monday}
        classesCount={visibleClasses.length}
        hiddenClassesCount={hiddenClasses.length}
        editing={isEditing}
        showAllClasses={showAllClasses}
        onShowAllClassesChange={handleShowAllClassesChange}
        onEditing={setIsEditing}
        onActiveChange={setActiveClassIndex}
        onEditingExit={() => handleClearUnsavedClasses(day.week_id, day.id)}
        onClassesCopy={copyClasses}
        onClassesClear={clearClasses}
      />
      <ClassesList
        classes={classes}
        editing={isEditing}
        activeIndex={activeClassIndex}
        onActiveChange={setActiveClassIndex}
        dayId={day.id}
        showAllClasses={showAllClasses}
        onUnsavedDelete={() => handleClearUnsavedClasses(day.week_id, day.id)}
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
  dayId: string
  showAllClasses: boolean
  onUnsavedDelete: () => void
}

const ClassesList: FC<ClassesListProps> = ({
  classes,
  editing,
  activeIndex,
  onActiveChange,
  groupId,
  dayId,
  showAllClasses,
  onUnsavedDelete,
}) => {
  const renderClasses = (): ReactNode => {
    const filteredClasses =
      showAllClasses || editing
        ? classes.filter(classData => !classData.is_cancelled)
        : classes.filter(classData => !classData.is_cancelled && !classData.is_hidden)

    if (filteredClasses.length === 0) {
      return <Class isWeekend={true} />
    }

    const sorted = sortByStartTime(filteredClasses)

    return (
      <div className="flex flex-col items-center">
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
            dayId={dayId}
            onUnsavedDelete={onUnsavedDelete}
          />
        ))}
      </div>
    )
  }

  return <>{renderClasses()}</>
}

interface EndBlockProps {
  editing: boolean
  onClassAdd?: () => void
  disabled?: boolean
}

const EndBlock: FC<EndBlockProps> = ({ editing, onClassAdd, disabled }) => {
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
    <Button
      type="button"
      variant="blockSm"
      size={editing ? "default" : "collapsed"}
      onClick={onClassAdd}
      className={wrapperClass}
      disabled={!editing || disabled}>
      <div className={iconClass}>
        <Add />
      </div>
    </Button>
  )
}
