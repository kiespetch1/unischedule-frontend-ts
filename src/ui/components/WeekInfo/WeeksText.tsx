import { FC } from "react"
import clsx from "clsx"
import { WeekTypeStrict } from "@/features/classes-schedule/types/classes-types.ts"

export interface WeeksTextProps {
  startYear?: number
  startMonth: number
  startDay: number
  selectedWeekType: WeekTypeStrict
  onWeekTypeSelect: (weekType?: WeekTypeStrict) => void
  lastAcademicWeekNumber: number
}

export const WeeksText: FC<WeeksTextProps> = ({
  startYear,
  startMonth,
  startDay,
  selectedWeekType,
  onWeekTypeSelect,
  lastAcademicWeekNumber,
}) => {
  const getDateWithOffset = (offsetDays?: number, baseDate?: Date): Date => {
    let date: Date
    const currentDate = baseDate || new Date()

    if (!offsetDays) {
      date = new Date(currentDate.setHours(0, 0, 0, 0))
    } else {
      date = new Date(
        new Date(new Date(currentDate).setDate(currentDate.getDate() + offsetDays)).setHours(
          0,
          0,
          0,
          0
        )
      )
    }

    return date
  }

  if (!startYear) {
    startYear = new Date().getFullYear()
  }
  const startOfAcademicYear = new Date(startYear, startMonth - 1, startDay)

  const getTodayWeekNumber = (offsetDays?: number): number => {
    const date = getDateWithOffset(offsetDays)
    const timeDiff = date.getTime() - startOfAcademicYear.getTime()
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

    return Math.ceil(dayDiff / 7)
  }
  const isTodayWeekEven = getTodayWeekNumber() % 2 === 0
  const weekTextClass = "font-raleway text-lg text-black"
  const firstWeekClass = clsx(
    weekTextClass,
    (selectedWeekType === "odd" && !isTodayWeekEven) ||
      (selectedWeekType === "even" && isTodayWeekEven)
      ? "font-semibold"
      : "cursor-pointer"
  )
  const secondWeekClass = clsx(
    weekTextClass,
    (selectedWeekType === "odd" && isTodayWeekEven) ||
      (selectedWeekType === "even" && !isTodayWeekEven)
      ? "font-semibold"
      : "cursor-pointer"
  )

  const getWeekTypeString = (offsetDays?: number): string => {
    if (!offsetDays) {
      offsetDays = 0
    }

    if (getTodayWeekNumber(offsetDays) % 2 === 0) {
      return "четная (верхняя)"
    } else {
      return "нечетная (нижняя)"
    }
  }

  const getWeekStartDate = (offsetDays?: number): Date => {
    const date = getDateWithOffset(offsetDays)
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1)

    return new Date(date.setDate(diff))
  }

  const getWeekEndDate = (offsetDays = 0): Date => {
    const date = getDateWithOffset(offsetDays)
    const dayOfWeek = date.getDay()

    // сколько дней двигаться до субботы
    // для воскресенья (0) — шаг = −1 (вчера была суббота),
    // в остальных случаях — до 6 − current
    const daysToSaturday = dayOfWeek === 0 ? -1 : 6 - dayOfWeek

    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + daysToSaturday)
  }

  const formatDate = (date: Date, referenceDate: Date = new Date()): string => {
    if (date.getFullYear() !== referenceDate.getFullYear()) {
      return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" })
    } else {
      return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" })
    }
  }

  const getWeekStartString = (offsetDays?: number): string => {
    const startDate = getWeekStartDate(offsetDays)
    const endDate = getWeekEndDate(offsetDays)

    return formatDate(startDate, endDate)
  }

  const getWeekEndString = (offsetDays?: number): string => {
    const startDate = getWeekStartDate(offsetDays)
    const endDate = getWeekEndDate(offsetDays)

    return formatDate(endDate, startDate)
  }

  const currentWeekNumber = getTodayWeekNumber()
  const nextWeekNumber = currentWeekNumber + 1

  if (currentWeekNumber > lastAcademicWeekNumber) {
    return (
      <div className="mt-3 flex flex-col items-start justify-center gap-px">
        <p className={clsx(weekTextClass, "font-semibold")}>
          В этом периоде учебные пары не проводятся
        </p>
        <p className={weekTextClass}>
          Посмотреть расписание зачётов и экзаменов можно на странице "
          <a href="/exams" className="text-blue-950 underline">
            Расписание сессии
          </a>
          "
        </p>
      </div>
    )
  }

  if (currentWeekNumber === lastAcademicWeekNumber) {
    return (
      <div className="mt-3 flex flex-col items-start justify-center gap-px">
        <p
          className={firstWeekClass}
          onClick={
            (selectedWeekType === "odd" && !isTodayWeekEven) ||
            (selectedWeekType === "even" && isTodayWeekEven)
              ? undefined
              : () => onWeekTypeSelect()
          }>
          Сейчас {getWeekTypeString()} неделя с {getWeekStartString()} по {getWeekEndString()} -{" "}
          {currentWeekNumber} неделя
        </p>
        <p className={weekTextClass}>
          Следующая неделя - зачетная. Расписание для зачетов можно посмотреть на странице "
          <a href="/exams" className="text-blue-950 underline">
            Расписание сессии
          </a>
          "
        </p>
      </div>
    )
  }

  return (
    <div className="mt-3 flex flex-col items-start justify-center gap-px">
      <p
        className={firstWeekClass}
        onClick={
          (selectedWeekType === "odd" && !isTodayWeekEven) ||
          (selectedWeekType === "even" && isTodayWeekEven)
            ? undefined
            : () => onWeekTypeSelect()
        }>
        Сейчас {getWeekTypeString()} неделя с {getWeekStartString()} по {getWeekEndString()} -{" "}
        {currentWeekNumber} неделя
      </p>
      <p
        className={secondWeekClass}
        onClick={
          (selectedWeekType === "odd" && isTodayWeekEven) ||
          (selectedWeekType === "even" && !isTodayWeekEven)
            ? undefined
            : () => onWeekTypeSelect()
        }>
        Следующая неделя {getWeekTypeString(7)} c {getWeekStartString(7)} по {getWeekEndString(7)} -{" "}
        {nextWeekNumber} неделя
      </p>
    </div>
  )
}
