import { ApiMutation } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  TeacherCreateModel,
  createTeacher,
} from "@/features/classes-schedule/teachers/create-teacher.ts"
import toast from "react-hot-toast"
import { TeacherModel } from "@/features/classes-schedule/types/classes-types.ts"

export const teachersKey = "teachers"

export const useCreateTeacher: ApiMutation<TeacherCreateModel, TeacherModel> = (options) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async values => {
      return createTeacher(values)
    },
    onSettled: (...args) => {
      void queryClient.invalidateQueries({ queryKey: [teachersKey] })
      options?.onSettled?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось добавить преподавателя")
      options?.onError?.(err, _vars, context)
    },
    onSuccess: (...args) => {
      toast.success("Преподаватель успешно добавлен")
      options?.onSuccess?.(...args)
    },
    retry: 3,
    ...options,
  })
}