import { WeekModel, WeekTypeStrict } from "@/features/classes-schedule/types/classes-types.ts"
import { FC } from "react"
import { Day } from "@components/DaysBlock/Day/Day.tsx"
import { DaySkeleton } from "./DaySkeleton.tsx"

export interface DaysBlockProps {
  selectedWeekType: WeekTypeStrict
  oddWeek: WeekModel
  evenWeek: WeekModel
  loading: boolean
}

export const DaysBlock: FC<DaysBlockProps> = ({ selectedWeekType, oddWeek, evenWeek, loading }) => {
  if (loading) {
    return (
      <div className="mt-4 flex flex-row flex-wrap items-start justify-evenly gap-x-3 gap-y-4">
        {[...new Array(6)].map((_, i) => (
          <DaySkeleton key={i} />
        ))}
      </div>
    )
  }
  return (
    <div className="mt-4 flex flex-row flex-wrap items-start justify-evenly gap-x-3 gap-y-4">
      {selectedWeekType === "odd"
        ? oddWeek?.days.map(day => <Day key={day.id} dayData={day} />)
        : evenWeek?.days.map(day => <Day key={day.id} dayData={day} />)}
    </div>
  )
}
