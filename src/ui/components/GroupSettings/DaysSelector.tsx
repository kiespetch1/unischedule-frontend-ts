import { FC, useEffect, useState } from "react"
import { ScrollArea } from "@/ui/basic/scroll-area"
import EvenWeek from "@assets/even-week.svg?react"
import OddWeek from "@assets/odd-week.svg?react"
import FirstGroup from "@assets/first-group.svg?react"
import SecondGroup from "@assets/second-group.svg?react"
import { WeekModel, DayOfWeek } from "@/features/classes-schedule/types/classes-types.ts"
import { DayCard } from "./DayCard.tsx"
import { WeekDayCard } from "./WeekDayCard.tsx"

export interface GlobalDaysResult {
  even: DayOfWeek[]
  odd: DayOfWeek[]
}

export interface DaysSelectorProps {
  mode: "group" | "global"
  weeks?: WeekModel[]
  onGroupChange?: (ids: string[]) => void
  onGlobalChange?: (result: GlobalDaysResult) => void
}

const weekDays: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
]

export const DaysSelector: FC<DaysSelectorProps> = ({
  mode,
  weeks,
  onGroupChange,
  onGlobalChange,
}) => {
  const [idList, setIdList] = useState<string[]>([])
  const [evenDays, setEvenDays] = useState<DayOfWeek[]>([])
  const [oddDays, setOddDays] = useState<DayOfWeek[]>([])

  useEffect(() => {
    if (mode === "group") {
      onGroupChange?.(idList)
    } else {
      onGlobalChange?.({ even: evenDays, odd: oddDays })
    }
  }, [idList, evenDays, oddDays, mode, onGroupChange, onGlobalChange])

  if (mode === "group") {
    return (
      <ScrollArea className="flex-grow w-full overflow-hidden">
        <div className="flex flex-col gap-3 pr-4">
          {weeks?.map(week => (
            <div key={week.id} className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <span className="font-raleway text-sm">
                  {week.type == "even" ? "Четная неделя" : "Нечетная неделя"}
                  {week.subgroup === "first"
                    ? ", первая подгруппа"
                    : week.subgroup === "second"
                      ? ", вторая подгруппа"
                      : null}
                </span>
                {week.type == "even" ? (
                  <EvenWeek width="20px" height="20px" />
                ) : (
                  <OddWeek width="20px" height="20px" />
                )}
                {week.subgroup === "first" && <FirstGroup width="20px" height="20px" />}
                {week.subgroup === "second" && <SecondGroup width="20px" height="20px" />}
              </div>

              <div className="flex flex-row flex-wrap gap-2">
                {week.days.map(day => (
                  <DayCard key={day.id} day={day} setIdList={setIdList} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className="flex-grow w-full overflow-hidden">
      <div className="flex flex-col gap-3 pr-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <span className="font-raleway text-sm">Четная неделя</span>
            <EvenWeek width="20px" height="20px" />
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {weekDays.map(day => (
              <WeekDayCard key={`even-${day}`} day={day} setList={setEvenDays} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <span className="font-raleway text-sm">Нечетная неделя</span>
            <OddWeek width="20px" height="20px" />
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {weekDays.map(day => (
              <WeekDayCard key={`odd-${day}`} day={day} setList={setOddDays} />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
