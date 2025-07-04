import FirstGroup from "@assets/first-group.svg?react"
import SecondGroup from "@assets/second-group.svg?react"
import EvenWeek from "@assets/even-week.svg?react"
import OddWeek from "@assets/odd-week.svg?react"
import { Toggle } from "./Toggle.tsx"
import { GroupSelector } from "./GroupSelector.tsx"
import { SubgroupStrict, WeekTypeStrict } from "@/features/classes-schedule/types/classes-types.ts"
import { FC, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Eye, EyeOff, LibraryBig } from "lucide-react"
import { TooltipWrapper } from "@/ui/components/common/TooltipWrapper"
import { LmsDataDialog } from "@/ui/components/LmsDataDialog/LmsDataDialog"
import toast from "react-hot-toast"
import { getWarningToastSettings } from "@/lib/toast-settings.tsx"

export interface WeekOptionsProps {
  hasFixedSubgroups: boolean
  selectedWeekType: WeekTypeStrict
  selectedSubgroup: SubgroupStrict
  onSubgroupSelect: (subgroup?: SubgroupStrict) => void
  onWeekTypeSelect: (weekType?: WeekTypeStrict) => void
  groupName: string | undefined
  loading: boolean
  groupId: string
  hasHiddenClasses: boolean
  showAllClasses: boolean
  onShowAllClassesChange: (show: boolean) => void
}

export const WeekOptions: FC<WeekOptionsProps> = ({
  hasFixedSubgroups,
  selectedWeekType,
  selectedSubgroup,
  onSubgroupSelect,
  onWeekTypeSelect,
  groupName,
  loading,
  groupId,
  hasHiddenClasses,
  showAllClasses,
  onShowAllClassesChange,
}) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isLmsDialogOpen, setIsLmsDialogOpen] = useState(false)

  useEffect(() => {
    if (searchParams.has("subgroup")) {
      onSubgroupSelect(searchParams.get("subgroup") as SubgroupStrict)
    }
    if (searchParams.has("week")) {
      onWeekTypeSelect(searchParams.get("week") as WeekTypeStrict)
    }
  }, [searchParams, onSubgroupSelect, onWeekTypeSelect])

  const handleSubgroupToggle = () => {
    const oppositeSubgroup: SubgroupStrict = selectedSubgroup === "first" ? "second" : "first"

    searchParams.set("subgroup", oppositeSubgroup)
    navigate(`?${searchParams.toString()}`)
    onSubgroupSelect()
  }

  const handleWeekTypeToggle = () => {
    const oppositeWeekType: WeekTypeStrict = selectedWeekType === "even" ? "odd" : "even"

    searchParams.set("week", oppositeWeekType)
    navigate(`?${searchParams.toString()}`)
    onWeekTypeSelect()
  }

  const handleShowAllClassesToggle = () => {
    const newValue = !showAllClasses
    onShowAllClassesChange(newValue)
    toast(
      newValue
        ? "Скрытые пары теперь отображаются для всех дней"
        : "Скрытые пары теперь скрыты для всех дней",
      getWarningToastSettings()
    )
  }

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-8">
        <GroupSelector labelText="Группа" groupName={groupName} isLoading={loading} />
        <Toggle
          labelText="Неделя"
          optionTexts={["Нечетная", "Четная"]}
          optionIcons={[<OddWeek />, <EvenWeek />]}
          setOppositeOption={handleWeekTypeToggle}
          value={selectedWeekType}
          onValue="even"
        />
        {hasFixedSubgroups && (
          <Toggle
            labelText="Подгруппа"
            optionTexts={["Первая", "Вторая"]}
            optionIcons={[<FirstGroup />, <SecondGroup />]}
            setOppositeOption={handleSubgroupToggle}
            value={selectedSubgroup}
            onValue="second"
          />
        )}
      </div>
      <div className="flex items-center gap-4">
        {!hasFixedSubgroups && hasHiddenClasses && (
          <TooltipWrapper message={showAllClasses ? "Скрыть все скрытые пары" : "Показать все скрытые пары"}>
            <button
              className="cursor-pointer rounded-xl p-2.5 transition-colors hover:bg-zinc-100"
              onClick={handleShowAllClassesToggle}>
              {showAllClasses ? (
                <Eye className="h-7 w-7 text-gray-500" />
              ) : (
                <EyeOff className="h-7 w-7 text-gray-500" />
              )}
            </button>
          </TooltipWrapper>
        )}
        <TooltipWrapper message="Открыть список кодов для предметов">
          <button
            className="cursor-pointer rounded-xl p-2.5 transition-colors hover:bg-zinc-100"
            onClick={() => setIsLmsDialogOpen(true)}>
            <LibraryBig className="h-7 w-7 text-gray-500" />
          </button>
        </TooltipWrapper>
      </div>
      <LmsDataDialog open={isLmsDialogOpen} onOpenChange={setIsLmsDialogOpen} groupId={groupId} />
    </div>
  )
}
