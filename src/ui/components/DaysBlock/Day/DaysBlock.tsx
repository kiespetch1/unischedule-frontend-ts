import {
  SubgroupStrict,
  WeekModel,
  WeekTypeStrict,
} from "@/features/classes-schedule/types/classes-types.ts"
import { FC } from "react"
import { Day } from "@components/DaysBlock/Day/Day.tsx"
import { DaySkeleton } from "./DaySkeleton.tsx"

export interface DaysBlockProps {
  selectedWeekType: WeekTypeStrict
  selectedSubgroup: SubgroupStrict
  oddWeek: WeekModel
  evenWeek: WeekModel
  oddWeekFirstSubgroup: WeekModel
  evenWeekFirstSubgroup: WeekModel
  oddWeekSecondSubgroup: WeekModel
  evenWeekSecondSubgroup: WeekModel
  loading: boolean
  groupId?: string
  hasFixedSubgroups: boolean
}

export const DaysBlock: FC<DaysBlockProps> = ({
  selectedWeekType,
  selectedSubgroup,
  oddWeek,
  evenWeek,
  oddWeekFirstSubgroup,
  evenWeekFirstSubgroup,
  oddWeekSecondSubgroup,
  evenWeekSecondSubgroup,
  loading,
  groupId,
  hasFixedSubgroups,
}) => {
  if (loading) {
    return (
      <div className="mt-4 flex flex-row flex-wrap items-start justify-evenly gap-x-3 gap-y-4">
        {[...new Array(6)].map((_, i) => (
          <DaySkeleton key={i} />
        ))}
      </div>
    )
  }

  if (hasFixedSubgroups) {
    return (
      <div className="mt-4 flex flex-row flex-wrap items-start justify-evenly gap-x-3 gap-y-4">
        {selectedSubgroup === "first"
          ? selectedWeekType === "odd"
            ? oddWeekFirstSubgroup?.days.map(day => (
                <Day key={day.id} dayData={day} groupId={groupId} />
              ))
            : evenWeekFirstSubgroup?.days.map(day => (
                <Day key={day.id} dayData={day} groupId={groupId} />
              ))
          : selectedWeekType === "odd"
            ? oddWeekSecondSubgroup?.days.map(day => (
                <Day key={day.id} dayData={day} groupId={groupId} />
              ))
            : evenWeekSecondSubgroup?.days.map(day => (
                <Day key={day.id} dayData={day} groupId={groupId} />
              ))}
      </div>
    )
  }

  return (
    <div className="mt-4 flex flex-row flex-wrap items-start justify-evenly gap-x-3 gap-y-4">
      {selectedWeekType === "odd"
        ? oddWeek?.days.map(day => <Day key={day.id} dayData={day} groupId={groupId} />)
        : evenWeek?.days.map(day => <Day key={day.id} dayData={day} groupId={groupId} />)}
    </div>
  )
}
