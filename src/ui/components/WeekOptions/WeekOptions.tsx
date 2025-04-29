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
  selectedSubgroup: SubgroupStrict
  setSelectedSubgroup: (subgroup?: SubgroupStrict) => void
  selectedWeekType: WeekTypeStrict
  setSelectedWeekType: (weekType?: WeekTypeStrict) => void
  groupName: string | undefined
  isLoading: boolean
}

export const WeekOptions: FC<WeekOptionsProps> = ({
  selectedSubgroup,
  setSelectedSubgroup,
  selectedWeekType,
  setSelectedWeekType,
  groupName,
  isLoading,
}) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has("subgroup")) {
      setSelectedSubgroup(searchParams.get("subgroup") as SubgroupStrict)
    }
    if (searchParams.has("week")) {
      setSelectedWeekType(searchParams.get("week") as WeekTypeStrict)
    }
  }, [searchParams, setSelectedSubgroup, setSelectedWeekType])

  const handleSubgroupToggle = () => {
    const oppositeSubgroup: SubgroupStrict = selectedSubgroup === "first" ? "second" : "first"

    searchParams.set("subgroup", oppositeSubgroup)
    navigate(`?${searchParams.toString()}`)
    setSelectedSubgroup()
  }

  const handleWeekTypeToggle = () => {
    const oppositeWeekType: WeekTypeStrict = selectedWeekType === "even" ? "odd" : "even"

    searchParams.set("week", oppositeWeekType)
    navigate(`?${searchParams.toString()}`)
    setSelectedWeekType()
  }

  return (
    <div className="flex flex-row items-center justify-start space-x-8">
      <GroupSelector labelText="Группа" groupName={groupName} isLoading={isLoading} />
      <Toggle
        labelText="Неделя"
        optionTexts={["Нечетная", "Четная"]}
        optionIcons={[<OddWeek />, <EvenWeek />]}
        setOppositeOption={handleWeekTypeToggle}
        value={selectedWeekType}
        onValue="even"
      />
      <Toggle
        labelText="Подгруппа"
        optionTexts={["Первая", "Вторая"]}
        optionIcons={[<FirstGroup />, <SecondGroup />]}
        setOppositeOption={handleSubgroupToggle}
        value={selectedSubgroup}
        onValue="second"
      />
    </div>
  )
}
