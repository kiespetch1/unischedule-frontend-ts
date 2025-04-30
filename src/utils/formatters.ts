import { isNullableOrEmpty } from "@/utils/equality-comparers.ts"
import { DayOfWeek } from "@/features/classes-schedule/types/classes-types.ts"
import type { ZodIssue } from "zod"

export type UnformattedSearchParams = Record<
  string,
  number | string | Date | (number | string | Date)[] | boolean | null | undefined
>

export const formatSearchParams = (params: UnformattedSearchParams) => {
  const searchParam = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (isNullableOrEmpty(value)) continue

    if (Array.isArray(value)) {
      value.forEach(item => searchParam.append(key, item.toString()))
    } else if (value instanceof Date) {
      searchParam.append(key, value.toISOString())
    } else {
      searchParam.append(key, value?.toString())
    }
  }
  return searchParam
}

export const trimEndChars = (string: string, count: number): string => {
  if (string.length <= count) {
    return ""
  }
  return string.substring(0, string.length - count)
}

export function trimStartChars(str: string, count: number): string {
  if (count <= 0) {
    return ""
  }
  return str.length > count ? str.slice(0, count) : str
}

export const getPluralForm = (value: number, words: string[]) => {
  value = Math.abs(value) % 100
  const num = value % 10
  if (value > 10 && value < 20) return words[2]
  if (num > 1 && num < 5) return words[1]
  if (num === 1) return words[0]
  return words[2]
}

export const getRussianDayName = (dayName: DayOfWeek) => {
  switch (dayName) {
    case DayOfWeek.Monday:
      return "Понедельник"
    case DayOfWeek.Tuesday:
      return "Вторник"
    case DayOfWeek.Wednesday:
      return "Среда"
    case DayOfWeek.Thursday:
      return "Четверг"
    case DayOfWeek.Friday:
      return "Пятница"
    case DayOfWeek.Saturday:
      return "Суббота"
  }
}

export const getErrorMessages = (
  errors: Array<string | { message?: string } | ZodIssue | undefined>
): string => {
  return errors
    .filter((err): err is string | { message?: string } | ZodIssue => Boolean(err))
    .map(err => {
      if (typeof err === "string") {
        return err
      }
      if (typeof err.message === "string") {
        if (Array.isArray((err as ZodIssue).path) && (err as ZodIssue).path.length > 0) {
          const zi = err as ZodIssue
          return `${zi.message}`
        }
        return err.message
      }
      return JSON.stringify(err)
    })
    .filter(Boolean)
    .join(", ")
}
