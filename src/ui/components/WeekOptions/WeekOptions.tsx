import FirstGroup from "@assets/first-group.svg?react"
import SecondGroup from "@assets/second-group.svg?react"
import EvenWeek from "@assets/even-week.svg?react"
import OddWeek from "@assets/odd-week.svg?react"
import { Toggle } from "./Toggle.tsx"
import { GroupSelector } from "./GroupSelector.tsx"

export const WeekOptions = () => {
  return (
    <div className="flex flex-row items-center justify-center space-x-8">
      <GroupSelector labelText="Группа" groupText="ИВТ-Б21" />
      <Toggle
        labelText="Неделя"
        firstIcon={<OddWeek />}
        firstText="Нечетная"
        secondIcon={<EvenWeek />}
        secondText="Четная"
      />
      <Toggle
        labelText="Подгруппа"
        firstIcon={<FirstGroup />}
        firstText="Первая"
        secondIcon={<SecondGroup />}
        secondText="Вторая"
      />
    </div>
  )
}
