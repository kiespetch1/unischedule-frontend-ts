import {
  ClassModel,
  ClassType,
  LocationModel,
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
  switch (role.toLowerCase()) {
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

export const extractDomain = (url: string | null): string => {
  if (!url) return ""

  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return ""
  }
}

export const formatLocationName = (location: LocationModel): string => {
  if (location.type === "online" && location.link) {
    const domain = extractDomain(location.link)
    if (domain) {
      return `${location.name} (${domain})`
    }
  }
  return location.name
}
