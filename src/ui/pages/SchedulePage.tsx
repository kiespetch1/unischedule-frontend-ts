import { WeekOptions } from "../components/WeekOptions/WeekOptions.tsx"
import { WeekInfo } from "../components/WeekInfo/WeekInfo.tsx"
import { useState } from "react"
import { Subgroup, WeekType } from "@/types/classes-types.ts"

export const SchedulePage = () => {
  const [currentWeekType, setCurrentWeekType] = useState<WeekType>("even")
  const [currentSubgroup, setCurrentSubgroup] = useState<Subgroup>("first")
  return (
    <div className="mx-8 flex flex-col items-start space-y-2">
      <WeekOptions
        currentWeekType={currentWeekType}
        currentSubgroup={currentSubgroup}
        setCurrentSubgroup={setCurrentSubgroup}
        setCurrentWeekType={setCurrentWeekType}
      />
      <WeekInfo currentWeekType={currentWeekType} setCurrentWeekType={setCurrentWeekType} />
    </div>
  )
}
