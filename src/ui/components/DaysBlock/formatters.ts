import {
  ClassModel,
  ClassType,
  LocationType,
} from "@/features/classes-schedule/types/classes-types.ts"

export const getRussianClassTypeName = (classType: ClassType) => {
  switch (classType) {
    case "lecture":
      return "Лекция"
    case "practice":
      return "Практика"
    case "lab_work":
      return "Лаб. работа"
  }
}

export const getRussianLocationTypeName = (location: LocationType) => {
  switch (location) {
    case "irl":
      return "Очно"
    case "online":
      return "Дистант"
  }
}

export const sortByStartTime = (classes: ClassModel[]) =>
  classes.slice().sort((a, b) => {
    if (a.started_at < b.started_at) return -1
    if (a.started_at > b.started_at) return 1
    return 0
  })
