import {
  ClassModel,
  ClassType,
  LocationType,
  RoleType,
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

export const getRussianRoleName = (role: RoleType) => {
  switch (role) {
    case "admin":
      return "Администратор"
    case "staff":
      return "Сотрудник ВУЗа"
    case "group_leader":
      return "Староста группы"
    case "user":
      return "Студент"
  }
}

export const sortByStartTime = (classes: ClassModel[]) =>
  classes.slice().sort((a, b) => {
    if (a.started_at < b.started_at) return -1
    if (a.started_at > b.started_at) return 1
    return 0
  })
