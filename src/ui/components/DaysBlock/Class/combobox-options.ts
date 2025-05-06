import { Options } from "@/components/ui/combobox.tsx"
import { ClassType, Subgroup, WeekType } from "@/features/classes-schedule/types/classes-types.ts"

export const ClassTypeOptions: Options<ClassType>[] = [
  { value: "lecture", label: "Лекция" },
  { value: "practice", label: "Практика" },
  { value: "lab_work", label: "Лаб. работа" },
]

export const WeekTypeOptions: Options<WeekType>[] = [
  { value: "every", label: "Все" },
  { value: "even", label: "Четная" },
  { value: "odd", label: "Нечетная" },
]

export const SubgroupOptions: Options<Subgroup>[] = [
  { value: "none", label: "Нет" },
  { value: "first", label: "Первая" },
  { value: "second", label: "Вторая" },
]
