import { ClassType, LocationType } from "@/features/classes-schedule/types/classes-types.ts"

export const getRussianClassTypeName = (classType: ClassType) => {
  switch (classType) {
    case "lecture":
      return "Лекция"
    case "practice":
      return "Практика"
    case "labwork":
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
