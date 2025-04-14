import FirstGroup from "@assets/first-group.svg?react"
import SecondGroup from "@assets/second-group.svg?react"
import EvenWeek from "@assets/even-week.svg?react"
import OddWeek from "@assets/odd-week.svg?react"
import { Toggle } from "./Toggle.tsx"
import { GroupSelector } from "./GroupSelector.tsx"
import { Subgroup, WeekType } from "@/types/classes-types.ts"
import { FC } from "react"

export interface WeekOptionsProps {
  currentSubgroup: Subgroup
  setCurrentSubgroup: (subgroup: Subgroup) => void
  currentWeekType: WeekType
  setCurrentWeekType: (weekType: WeekType) => void
}

export const WeekOptions: FC<WeekOptionsProps> = ({
  currentSubgroup,
  setCurrentSubgroup,
  currentWeekType,
  setCurrentWeekType,
}) => {
  const handleSubgroupChange = () => {
    switch (currentSubgroup) {
      case "first":
        setCurrentSubgroup("second")
        break
      case "second":
        setCurrentSubgroup("first")
        break
    }
  }

  const handleWeekTypeChange = () => {
    switch (currentWeekType) {
      case "even":
        setCurrentWeekType("odd")
        break
      case "odd":
        setCurrentWeekType("even")
        break
    }
  }

  return (
    <div className="flex flex-row items-center justify-center space-x-8">
      <GroupSelector labelText="Группа" groupText="ИВТ-Б21" />
      <Toggle
        labelText="Неделя"
        firstIcon={<OddWeek />}
        firstText="Нечетная"
        secondIcon={<EvenWeek />}
        secondText="Четная"
        setOppositeOption={handleWeekTypeChange}
      />
      <Toggle
        labelText="Подгруппа"
        firstIcon={<FirstGroup />}
        firstText="Первая"
        secondIcon={<SecondGroup />}
        secondText="Вторая"
        setOppositeOption={handleSubgroupChange}
      />
    </div>
  )
}
