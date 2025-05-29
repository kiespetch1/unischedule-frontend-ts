import { WeeksText } from "./WeeksText.tsx"
import { WeekTypeStrict } from "@/features/classes-schedule/types/classes-types.ts"
import { FC } from "react"

export interface WeekInfoProps {
  selectedWeekType: WeekTypeStrict
  onWeekTypeSelect: (weekType?: WeekTypeStrict) => void
  lastAcademicWeekNumber: number
}

export const WeekInfo: FC<WeekInfoProps> = ({ selectedWeekType, onWeekTypeSelect, lastAcademicWeekNumber }) => {
  return (
    <div>
      <WeeksText
        startYear={new Date().getFullYear()}
        startMonth={2}
        startDay={3}
        selectedWeekType={selectedWeekType}
        onWeekTypeSelect={onWeekTypeSelect}
        lastAcademicWeekNumber={lastAcademicWeekNumber}
      />
    </div>
  )
}
