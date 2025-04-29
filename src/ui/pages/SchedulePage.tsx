import { WeekOptions } from "../components/WeekOptions/WeekOptions.tsx"
import { WeekInfo } from "../components/WeekInfo/WeekInfo.tsx"
import { useEffect } from "react"
import { LastAnnouncementBlock } from "@components/WeekInfo/LastNotificationBlock/LastAnnouncementBlock.tsx"
import { useGetGroupById } from "@/features/classes-schedule/groups/hooks/use-group-query.ts"
import { Day } from "@components/Day/Day.tsx"
import { useSubgroup, useWeekType } from "@/hooks/use-toggle.ts"

export const SchedulePage = () => {
  const [selectedWeekType, setSelectedWeekType] = useWeekType()
  const [selectedSubgroup, setSelectedSubgroup] = useSubgroup()

  const { data: group, isLoading } = useGetGroupById({ id: "340cb1cf-b29f-4d21-b0b5-6a5f68e26647" })
  const oddWeek = group?.weeks.find(week => week.type === "odd")
  const evenWeek = group?.weeks.find(week => week.type === "even")

  useEffect(() => {
    if (group) {
      document.title = `Расписание группы ${group.name}`
    }
  }, [group])

  return (
    <div className="mx-8 flex flex-col items-start space-y-2">
      <WeekOptions
        selectedWeekType={selectedWeekType}
        selectedSubgroup={selectedSubgroup}
        setSelectedSubgroup={setSelectedSubgroup}
        setSelectedWeekType={setSelectedWeekType}
        groupName={group?.name}
        isLoading={isLoading}
      />
      <WeekInfo selectedWeekType={selectedWeekType} setSelectedWeekType={setSelectedWeekType} />
      <LastAnnouncementBlock message={group && group.last_announcement?.message} />

      <div className="mt-4 flex flex-row flex-wrap items-start justify-evenly space-x-3 space-y-4">
        {selectedWeekType === "odd"
          ? oddWeek?.days.map(day => <Day key={day.id} dayData={day} />)
          : evenWeek?.days.map(day => <Day key={day.id} dayData={day} />)}
      </div>
    </div>
  )
}
