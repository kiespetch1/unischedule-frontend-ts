import { useQuery } from "@tanstack/react-query"
import { getTeachers } from "@/features/classes-schedule/teachers/get-teachers.ts"

const teachersKey = "teachers"

export const useGetTeachers = () =>
  useQuery({ queryKey: [teachersKey], queryFn: () => getTeachers() })
