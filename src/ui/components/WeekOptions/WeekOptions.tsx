import FirstGroup from "@assets/first-group.svg?react"
import SecondGroup from "@assets/second-group.svg?react"
import EvenWeek from "@assets/even-week.svg?react"
import OddWeek from "@assets/odd-week.svg?react"
import { Toggle } from "./Toggle.tsx"
import { GroupSelector } from "./GroupSelector.tsx"
import { SubgroupStrict, WeekTypeStrict } from "@/features/classes-schedule/types/classes-types.ts"
import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export interface WeekOptionsProps {
  currentSubgroup: SubgroupStrict
  setCurrentSubgroup: (subgroup: SubgroupStrict) => void
  currentWeekType: WeekTypeStrict
  setCurrentWeekType: (weekType: WeekTypeStrict) => void
  groupName: string | undefined
  isLoading: boolean
}

export const WeekOptions: FC<WeekOptionsProps> = ({
  currentSubgroup,
  setCurrentSubgroup,
  currentWeekType,
  setCurrentWeekType,
  groupName,
  isLoading,
}) => {
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)

  useEffect(() => {
    if (searchParams.has("subgroup")) {
      setCurrentSubgroup(searchParams.get("subgroup") as SubgroupStrict)
    }
    if (searchParams.has("week")) {
      setCurrentWeekType(searchParams.get("week") as WeekTypeStrict)
    }
  })

  const handleSubgroupChange = () => {
    const oppositeSubgroup: SubgroupStrict = currentSubgroup === "first" ? "second" : "first"

    searchParams.set("subgroup", oppositeSubgroup)
    navigate(`?${searchParams.toString()}`)
    setCurrentSubgroup(oppositeSubgroup)
  }

  const handleWeekTypeChange = () => {
    const nextWeekType: WeekTypeStrict = currentWeekType === "even" ? "odd" : "even"

    searchParams.set("week", nextWeekType)
    navigate(`?${searchParams.toString()}`)
    setCurrentWeekType(nextWeekType)
  }

  return (
    <div className="flex flex-row items-center justify-start space-x-8">
      <GroupSelector labelText="Группа" groupName={groupName} isLoading={isLoading} />
      <Toggle
        labelText="Неделя"
        optionTexts={["Нечетная", "Четная"]}
        optionIcons={[<OddWeek />, <EvenWeek />]}
        setOppositeOption={handleWeekTypeChange}
        value={currentWeekType}
        onValue="even"
      />
      <Toggle
        labelText="Подгруппа"
        optionTexts={["Первая", "Вторая"]}
        optionIcons={[<FirstGroup />, <SecondGroup />]}
        setOppositeOption={handleSubgroupChange}
        value={currentSubgroup}
        onValue="second"
      />
    </div>
  )
}
