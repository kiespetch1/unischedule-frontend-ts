import { useReducer } from "react"
import {
  LocationType,
  SubgroupStrict,
  WeekTypeStrict,
} from "@/features/classes-schedule/types/classes-types.ts"

export const useWeekType = (initial: WeekTypeStrict = "odd") => {
  return useReducer((prevWeekType, newWeekType) => {
    if (newWeekType) return newWeekType
    if (prevWeekType === "odd") return "even"
    if (prevWeekType === "even") return "odd"
  }, initial)
}

export const useSubgroup = (initial: SubgroupStrict = "first") => {
  return useReducer((prevSubgroup, newSubgroup) => {
    if (newSubgroup) return newSubgroup
    if (prevSubgroup === "first") return "second"
    if (prevSubgroup === "second") return "odd"
  }, initial)
}

export const useLocationType = (initial: LocationType = "irl") => {
  return useReducer((prevLocationType, newLocationType) => {
    if (newLocationType) return newLocationType
    if (prevLocationType === "irl") return "online"
    if (prevLocationType === "online") return "irl"
  }, initial)
}

export const useToggle = (initial: boolean = false) => {
  return useReducer((prevState, newState?: boolean) => {
    if (newState === true || newState === false) return newState
    return !prevState
  }, initial)
}
