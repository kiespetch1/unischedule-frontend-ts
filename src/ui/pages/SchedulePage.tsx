import { WeekOptions } from "../components/WeekOptions/WeekOptions.tsx"
import { WeekInfo } from "../components/WeekInfo/WeekInfo.tsx"
import { useState } from "react"
import { SubgroupStrict, WeekTypeStrict } from "@/features/classes-schedule/types/classes-types.ts"
import { LastAnnouncementBlock } from "@components/WeekInfo/LastNotificationBlock/LastAnnouncementBlock.tsx"
import { useGetGroupById } from "@/features/classes-schedule/groups/hooks/use-group-query.ts"
import { Day } from "@components/Day/Day.tsx"

export const SchedulePage = () => {
  const [currentWeekType, setCurrentWeekType] = useState<WeekTypeStrict>("even")
  const [currentSubgroup, setCurrentSubgroup] = useState<SubgroupStrict>("first")

  const { data: group } = useGetGroupById({ id: "55ea0ea8-deb1-487b-9331-46172acc3c8b" })
  return (
    <div className="mx-8 flex flex-col items-start space-y-2">
      <WeekOptions
        currentWeekType={currentWeekType}
        currentSubgroup={currentSubgroup}
        setCurrentSubgroup={setCurrentSubgroup}
        setCurrentWeekType={setCurrentWeekType}
      />
      <WeekInfo currentWeekType={currentWeekType} setCurrentWeekType={setCurrentWeekType} />
      <LastAnnouncementBlock message={group && group.last_announcement?.message} />

      <div className="mt-4 flex flex-row flex-wrap items-start justify-evenly space-x-3 space-y-4">
        {group?.weeks[0]?.days.map(day => <Day key={day.id} dayData={day} />)}
      </div>
    </div>
  )
}
