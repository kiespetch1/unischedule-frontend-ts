import { WeekOptions } from "../components/WeekOptions/WeekOptions.tsx"
import { WeekInfo } from "../components/WeekInfo/WeekInfo.tsx"
import { useEffect, useState } from "react"
import { SubgroupStrict, WeekTypeStrict } from "@/features/classes-schedule/types/classes-types.ts"
import { LastAnnouncementBlock } from "@components/WeekInfo/LastNotificationBlock/LastAnnouncementBlock.tsx"
import { useGetGroupById } from "@/features/classes-schedule/groups/hooks/use-group-query.ts"
import { Day } from "@components/Day/Day.tsx"
import { apiFetch } from "@/api/api-fetch.ts"

export const SchedulePage = () => {
  const [currentWeekType, setCurrentWeekType] = useState<WeekTypeStrict>("odd")
  const [currentSubgroup, setCurrentSubgroup] = useState<SubgroupStrict>("first")

  const { data: group, isLoading } = useGetGroupById({ id: "55ea0ea8-deb1-487b-9331-46172acc3c8b" })
  const oddWeek = group?.weeks.find(week => week.type === "odd")
  const evenWeek = group?.weeks.find(week => week.type === "even")

  apiFetch("https://localhost:7002/api/v1/groups/32129d2f-f45a-4b7c-b147-1be4e8f26e3d", {
    method: "DELETE",
  })
    .then(response => response.json())
    .then(json => console.log(json))

  useEffect(() => {
    if (group) {
      document.title = `Расписание группы ${group.name}`
    }
  }, [group])
  return (
    <div className="mx-8 flex flex-col items-start space-y-2">
      <WeekOptions
        currentWeekType={currentWeekType}
        currentSubgroup={currentSubgroup}
        setCurrentSubgroup={setCurrentSubgroup}
        setCurrentWeekType={setCurrentWeekType}
        groupName={group?.name}
        isLoading={isLoading}
      />
      <WeekInfo currentWeekType={currentWeekType} setCurrentWeekType={setCurrentWeekType} />
      <LastAnnouncementBlock message={group && group.last_announcement?.message} />

      <div className="mt-4 flex flex-row flex-wrap items-start justify-evenly space-x-3 space-y-4">
        {currentWeekType === "odd"
          ? oddWeek?.days.map(day => <Day key={day.id} dayData={day} />)
          : evenWeek?.days.map(day => <Day key={day.id} dayData={day} />)}
      </div>
    </div>
  )
}
