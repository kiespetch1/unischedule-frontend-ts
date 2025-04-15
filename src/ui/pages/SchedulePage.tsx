import { WeekOptions } from "../components/WeekOptions/WeekOptions.tsx"
import { WeekInfo } from "../components/WeekInfo/WeekInfo.tsx"
import { useState } from "react"
import { SubgroupStrict, WeekTypeStrict } from "@/types/classes-types.ts"
import { LastAnnouncementBlock } from "@components/LastNotificationBlock/LastAnnouncementBlock.tsx"

export const SchedulePage = () => {
  const [currentWeekType, setCurrentWeekType] = useState<WeekTypeStrict>("even")
  const [currentSubgroup, setCurrentSubgroup] = useState<SubgroupStrict>("first")

  return (
    <div className="mx-8 flex flex-col items-start space-y-2">
      <WeekOptions
        currentWeekType={currentWeekType}
        currentSubgroup={currentSubgroup}
        setCurrentSubgroup={setCurrentSubgroup}
        setCurrentWeekType={setCurrentWeekType}
      />
      <WeekInfo currentWeekType={currentWeekType} setCurrentWeekType={setCurrentWeekType} />
      <LastAnnouncementBlock message="вассап кони" />
    </div>
  )
}
