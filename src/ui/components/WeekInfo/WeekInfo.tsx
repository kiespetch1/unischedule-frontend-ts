import { WeeksText } from "./WeeksText.tsx"
import { WeekTypeStrict } from "@/types/classes-types.ts"
import { FC } from "react"

export interface WeekInfoProps {
  currentWeekType: WeekTypeStrict
  setCurrentWeekType: (weekType: WeekTypeStrict) => void
}

export const WeekInfo: FC<WeekInfoProps> = ({ currentWeekType, setCurrentWeekType }) => {
  return (
    <div>
      <WeeksText
        startYear={new Date().getFullYear()}
        startMonth={2}
        startDay={3}
        currentWeekType={currentWeekType}
        setCurrentWeekType={setCurrentWeekType}
      />
    </div>
  )
}
