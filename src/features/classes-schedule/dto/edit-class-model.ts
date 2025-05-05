import {
  ClassModel,
  ClassType,
  Subgroup,
  WeekType,
} from "@/features/classes-schedule/types/classes-types.ts"
import { trimEndChars } from "@/utils/formatters.ts"

export interface ClassEditModel {
  name: string
  started_at: string
  finished_at: string
  type: ClassType
  features: { week_type: WeekType; subgroup: Subgroup }
  location_id: string
  teacher_id: string
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
  }
}
