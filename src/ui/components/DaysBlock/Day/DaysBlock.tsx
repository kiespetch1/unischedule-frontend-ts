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
  showAllClasses: boolean
  onShowAllClassesChange: (show: boolean) => void
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
  showAllClasses,
  onShowAllClassesChange,
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
                <Day
                  key={day.id}
                  dayData={day}
                  groupId={groupId}
                  globalShowAllClasses={showAllClasses}
                  onGlobalShowAllClassesChange={onShowAllClassesChange}
                />
              ))
            : evenWeekFirstSubgroup?.days.map(day => (
                <Day
                  key={day.id}
                  dayData={day}
                  groupId={groupId}
                  globalShowAllClasses={showAllClasses}
                  onGlobalShowAllClassesChange={onShowAllClassesChange}
                />
              ))
          : selectedWeekType === "odd"
            ? oddWeekSecondSubgroup?.days.map(day => (
                <Day
                  key={day.id}
                  dayData={day}
                  groupId={groupId}
                  globalShowAllClasses={showAllClasses}
                  onGlobalShowAllClassesChange={onShowAllClassesChange}
                />
              ))
            : evenWeekSecondSubgroup?.days.map(day => (
                <Day
                  key={day.id}
                  dayData={day}
                  groupId={groupId}
                  globalShowAllClasses={showAllClasses}
                  onGlobalShowAllClassesChange={onShowAllClassesChange}
                />
              ))}
      </div>
    )
  }

  return (
    <div className="mt-4 flex flex-row flex-wrap items-start justify-evenly gap-x-3 gap-y-4">
      {selectedWeekType === "odd"
        ? oddWeek?.days.map(day => (
            <Day
              key={day.id}
              dayData={day}
              groupId={groupId}
              globalShowAllClasses={showAllClasses}
              onGlobalShowAllClassesChange={onShowAllClassesChange}
            />
          ))
        : evenWeek?.days.map(day => (
            <Day
              key={day.id}
              dayData={day}
              groupId={groupId}
              globalShowAllClasses={showAllClasses}
              onGlobalShowAllClassesChange={onShowAllClassesChange}
            />
          ))}
    </div>
  )
}
