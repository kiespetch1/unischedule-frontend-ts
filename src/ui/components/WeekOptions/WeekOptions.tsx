import FirstGroup from "@assets/first-group.svg?react"
import SecondGroup from "@assets/second-group.svg?react"
import EvenWeek from "@assets/even-week.svg?react"
import OddWeek from "@assets/odd-week.svg?react"
import { Toggle } from "./Toggle.tsx"
import { GroupSelector } from "./GroupSelector.tsx"
import { SubgroupStrict, WeekTypeStrict } from "@/features/classes-schedule/types/classes-types.ts"
import { FC, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export interface WeekOptionsProps {
  hasFixedSubgroups: boolean
  selectedWeekType: WeekTypeStrict
  selectedSubgroup: SubgroupStrict
  onSubgroupSelect: (subgroup?: SubgroupStrict) => void
  onWeekTypeSelect: (weekType?: WeekTypeStrict) => void
  groupName: string | undefined
  loading: boolean
}

export const WeekOptions: FC<WeekOptionsProps> = ({
  hasFixedSubgroups,
  selectedWeekType,
  selectedSubgroup,
  onSubgroupSelect,
  onWeekTypeSelect,
  groupName,
  loading,
}) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

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

  return (
    <div className="flex flex-row items-center justify-start gap-8">
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
  )
}
