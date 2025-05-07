import {
  ClassModel,
  ClassType,
  Subgroup,
  WeekType,
} from "@/features/classes-schedule/types/classes-types.ts"
import { trimEndChars } from "@/utils/formatters.ts"
import { defaultId } from "@/utils/default-entities.ts"

export interface ClassEditModel {
  name: string
  started_at: string
  finished_at: string
  type: ClassType
  features: { week_type: WeekType; subgroup: Subgroup }
  location_id: string
  teacher_id: string
  is_new: boolean
}

export interface ClassEditModelFlat {
  name: string
  started_at: string
  finished_at: string
  type: ClassType
  week_type: WeekType
  subgroup: Subgroup
  location_id: string
  teacher_id: string
}

export interface ClassCreateModel {
  name: string
  started_at: string
  finished_at: string
  type: ClassType
  week_type: WeekType
  subgroup: Subgroup
  location_id: string
  teacher_id: string
  day_id: string
}

export const toClassEditModel = (classModel: ClassModel): ClassEditModel => {
  return {
    name: classModel.name,
    started_at: trimEndChars(classModel.started_at, 3),
    finished_at: trimEndChars(classModel.finished_at, 3),
    type: classModel.type,
    features: { week_type: classModel.week_type, subgroup: classModel.subgroup },
    location_id: classModel.location.id,
    teacher_id: classModel.teacher.id,
    is_new: classModel.id === defaultId,
  }
}
export const toClassEditModelFlat = (classModel: ClassEditModel): ClassEditModelFlat => {
  return {
    name: classModel.name,
    started_at: classModel.started_at + ":00",
    finished_at: classModel.finished_at + ":00",
    type: classModel.type,
    week_type: classModel.features.week_type,
    subgroup: classModel.features.subgroup,
    location_id: classModel.location_id,
    teacher_id: classModel.teacher_id,
  }
}

export const toClassCreateModel = (classModel: ClassEditModel, dayId: string): ClassCreateModel => {
  return {
    name: classModel.name,
    started_at: classModel.started_at + ":00",
    finished_at: classModel.finished_at + ":00",
    type: classModel.type,
    week_type: classModel.features.week_type,
    subgroup: classModel.features.subgroup,
    location_id: classModel.location_id,
    teacher_id: classModel.teacher_id,
    day_id: dayId,
  }
}
