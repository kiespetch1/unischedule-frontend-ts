import { WeeksText } from "./WeeksText.tsx"
import { WeekTypeStrict } from "@/features/classes-schedule/types/classes-types.ts"
import { FC } from "react"

export interface WeekInfoProps {
  selectedWeekType: WeekTypeStrict
  setSelectedWeekType: (weekType?: WeekTypeStrict) => void
}

export const WeekInfo: FC<WeekInfoProps> = ({ selectedWeekType, setSelectedWeekType }) => {
  return (
    <div>
      <WeeksText
        startYear={new Date().getFullYear()}
        startMonth={2}
        startDay={3}
        selectedWeekType={selectedWeekType}
        setSelectedWeekType={setSelectedWeekType}
      />
    </div>
  )
}
