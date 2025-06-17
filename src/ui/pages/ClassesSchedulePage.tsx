import { WeekOptions } from "../components/WeekOptions/WeekOptions.tsx"
import { WeekInfo } from "../components/WeekInfo/WeekInfo.tsx"
import { useEffect, useState } from "react"
import { AnnouncementBlock } from "@components/WeekInfo/AnnouncementBlock/AnnouncementBlock.tsx"
import { useGetGroupById } from "@/features/classes-schedule/groups/hooks/use-group-query.ts"
import { useSubgroup, useWeekType } from "@/hooks/use-toggle.ts"
import { useParams } from "react-router-dom"
import { defaultWeek } from "@/utils/default-entities.ts"
import { DaysBlock } from "@components/DaysBlock/Day/DaysBlock.tsx"

export const ClassesSchedulePage = () => {
  const [selectedWeekType, setSelectedWeekType] = useWeekType()
  const [selectedSubgroup, setSelectedSubgroup] = useSubgroup()
  const [showAllClasses, setShowAllClasses] = useState(false)
  const { groupId } = useParams()
  if (!groupId) throw new Error("groupId search param is not defined")

  const { data: group, isLoading } = useGetGroupById({ id: groupId })
  const hasFixedSubgroups = group?.has_fixed_subgroups || false

  const oddWeek = group?.weeks.find(week => week.type === "odd") || defaultWeek
  const evenWeek = group?.weeks.find(week => week.type === "even") || defaultWeek

  const oddWeekFirstSubgroup =
    group?.weeks.find(week => week.type === "odd" && week.subgroup === "first") || defaultWeek
  const evenWeekFirstSubgroup =
    group?.weeks.find(week => week.type === "even" && week.subgroup === "first") || defaultWeek
  const oddWeekSecondSubgroup =
    group?.weeks.find(week => week.type === "odd" && week.subgroup === "second") || defaultWeek
  const evenWeekSecondSubgroup =
    group?.weeks.find(week => week.type === "even" && week.subgroup === "second") || defaultWeek

  const hasHiddenClasses =
    group?.weeks.some(week => week.days.some(day => day.classes?.some(cls => cls.is_hidden))) ||
    false

  useEffect(() => {
    if (group) {
      document.title = `Расписание группы ${group.name}`
    }
  }, [group])

  return (
    <div className="mx-8 flex flex-col items-start gap-2">
      <WeekOptions
        selectedWeekType={selectedWeekType}
        selectedSubgroup={selectedSubgroup}
        onSubgroupSelect={setSelectedSubgroup}
        onWeekTypeSelect={setSelectedWeekType}
        groupName={group?.name}
        loading={isLoading}
        groupId={groupId}
        hasFixedSubgroups={hasFixedSubgroups}
        hasHiddenClasses={hasHiddenClasses}
        showAllClasses={showAllClasses}
        onShowAllClassesChange={setShowAllClasses}
      />
      <WeekInfo
        selectedWeekType={selectedWeekType}
        onWeekTypeSelect={setSelectedWeekType}
        lastAcademicWeekNumber={group?.last_academic_week_number || 16}
      />
      <AnnouncementBlock blockData={group?.announcements_block || undefined} loading={isLoading} />

      <DaysBlock
        selectedWeekType={selectedWeekType}
        selectedSubgroup={selectedSubgroup}
        oddWeek={oddWeek}
        evenWeek={evenWeek}
        oddWeekFirstSubgroup={oddWeekFirstSubgroup}
        evenWeekFirstSubgroup={evenWeekFirstSubgroup}
        oddWeekSecondSubgroup={oddWeekSecondSubgroup}
        evenWeekSecondSubgroup={evenWeekSecondSubgroup}
        loading={isLoading}
        groupId={groupId}
        hasFixedSubgroups={hasFixedSubgroups}
        showAllClasses={showAllClasses}
        onShowAllClassesChange={setShowAllClasses}
      />
    </div>
  )
}
