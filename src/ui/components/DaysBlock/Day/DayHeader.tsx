import { DayOfWeek } from "@/features/classes-schedule/types/classes-types.ts"
import Eraser from "@assets/eraser.svg?react"
import Copy from "@assets/copy.svg?react"
import Edit from "@assets/edit.svg?react"
import Cross from "@assets/cross.svg?react"
import { ActionDispatch, FC, useState } from "react"
import { getPluralForm, getRussianDayName, numberToDayOfWeek } from "@/utils/formatters.ts"
import clsx from "clsx"
import Dot from "@components/common/Dot.tsx"
import { TooltipWrapper } from "@components/common/TooltipWrapper.tsx"
import { PermissionGate } from "@/features/auth/components/auth-gate.tsx"
import { ConfirmDialog } from "@components/common/confirm-dialog.tsx"

export interface DayHeaderProps {
  dayOfWeek: DayOfWeek
  classesCount: number
  editing: boolean
  onEditing: ActionDispatch<[newState: boolean | undefined]>
  onActiveChange: (index: number | undefined) => void
  onEditingExit: () => void
  onClassesCopy: () => void
  onClassesClear: () => void
}

export const DayHeader: FC<DayHeaderProps> = ({
  dayOfWeek,
  classesCount,
  editing,
  onEditing,
  onActiveChange,
  onEditingExit,
  onClassesCopy,
  onClassesClear,
}) => {
  const getClassesCount = (count: number) => {
    if (count == 0) {
      return "выходной"
    } else {
      return `${count} ${getPluralForm(count, ["пара", "пары", "пар"])}`
    }
  }

  const dayNameTextClass = "font-raleway text-[27px] font-bold text-zinc-100"
  let dayNameTextFinalClass = dayNameTextClass
  if (dayOfWeek === numberToDayOfWeek(new Date().getDay())) {
    dayNameTextFinalClass = clsx(dayNameTextClass, "underline")
  }

  return (
    <div className="bg-iateblue flex h-[49px] w-[600px] flex-row items-center justify-between gap-4 rounded-t-sm px-5">
      <div className="flex flex-row items-center justify-start gap-4">
        <div className={dayNameTextFinalClass}>{getRussianDayName(dayOfWeek)}</div>
        <Dot colorClass={"bg-zinc-100"} sizeClass={"w-1 h-1"} />
        <div className="font-raleway text-[27px] font-light text-zinc-100">
          {getClassesCount(classesCount)}
        </div>
      </div>
      <PermissionGate permissions="can_update_class">
        <ButtonsBlock
          editing={editing}
          setIsEditing={onEditing}
          onActiveChange={onActiveChange}
          onEditingExit={onEditingExit}
          onClassesCopy={onClassesCopy}
          onClassesClear={onClassesClear}
          dayOfWeek={dayOfWeek}
        />
      </PermissionGate>
    </div>
  )
}

interface ButtonsBlock {
  editing: boolean
  setIsEditing: ActionDispatch<[newState: boolean | undefined]>
  onActiveChange: (index: number | undefined) => void
  onEditingExit: () => void
  onClassesCopy: () => void
  onClassesClear: () => void
  dayOfWeek: DayOfWeek
}

const ButtonsBlock: FC<ButtonsBlock> = ({
  editing,
  setIsEditing,
  onActiveChange,
  onEditingExit,
  onClassesCopy,
  onClassesClear,
  dayOfWeek,
}) => {
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [copyDialogOpen, setCopyDialogOpen] = useState(false)

  const dayName = getRussianDayName(dayOfWeek)

  if (editing) {
    return (
      <div className="flex items-center gap-5">
        <TooltipWrapper message="Скопировать день с текущей недели на противоположную">
          <button className="cursor-pointer pb-px" onClick={() => setCopyDialogOpen(true)}>
            <Copy />
          </button>
        </TooltipWrapper>
        <TooltipWrapper message="Удалить все пары текущего дня">
          <button className="cursor-pointer pb-px" onClick={() => setClearDialogOpen(true)}>
            <Eraser />
          </button>
        </TooltipWrapper>
        <TooltipWrapper message="Выйти из режима редактирования">
          <button
            onClick={() => {
              setIsEditing(undefined)
              onActiveChange(undefined)
              onEditingExit()
            }}
            className="cursor-pointer">
            <Cross width="20px" height="20px" color="#fff" />
          </button>
        </TooltipWrapper>
        <ConfirmDialog
          open={clearDialogOpen}
          onOpenChange={setClearDialogOpen}
          onConfirm={onClassesClear}
          title="Удаление пар"
          description={`Вы уверены, что хотите удалить все пары для дня ${dayName}?`}
          confirmButtonText="Удалить"
          confirmButtonVariant="destructive"
        />
        <ConfirmDialog
          open={copyDialogOpen}
          onOpenChange={setCopyDialogOpen}
          onConfirm={onClassesCopy}
          title="Копирование на противоположную неделю"
          description={`При копировании пар для дня ${dayName} на противоположную неделю, существующие на той неделе пары будут заменены текущими. Продолжить?`}
          confirmButtonText="Копировать"
          confirmButtonVariant="default"
        />
      </div>
    )
  }
  return (
    <TooltipWrapper message="Редактировать день">
      <button
        className="cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        onClick={() => setIsEditing(undefined)}>
        <Edit width="24px" height="24px" color="#fff" />
      </button>
    </TooltipWrapper>
  )
}
