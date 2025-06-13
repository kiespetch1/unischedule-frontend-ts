import { ApiMutationWithParams } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTeacher } from "@/features/classes-schedule/teachers/update-teacher.ts"
import { TeacherCreateModel } from "@/features/classes-schedule/teachers/create-teacher.ts"
import { teachersKey } from "./use-teacher-query.ts"
import toast from "react-hot-toast"

export interface UpdateTeacherParams {
  id: string
}

export const useUpdateTeacher: ApiMutationWithParams<UpdateTeacherParams, TeacherCreateModel> = (
  { id },
  options
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async values => updateTeacher(id, values),
    onSettled: (...args) => {
      void queryClient.invalidateQueries({ queryKey: [teachersKey] })
      options?.onSettled?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось обновить преподавателя")
      options?.onError?.(err, _vars, context)
    },
    onSuccess: (...args) => {
      toast.success("Преподаватель обновлён")
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}
