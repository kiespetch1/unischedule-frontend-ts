import { ApiMutationWithParams } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTeacher } from "@/features/classes-schedule/teachers/delete-teacher.ts"
import { teachersKey } from "./use-teacher-query.ts"
import toast from "react-hot-toast"

export interface DeleteTeacherParams {
  id: string
}

export const useDeleteTeacher: ApiMutationWithParams<DeleteTeacherParams> = (
  { id },
  options
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => deleteTeacher(id),
    onSuccess: async (...args) => {
      toast.success("Преподаватель удалён")
      await queryClient.invalidateQueries({ queryKey: [teachersKey] })
      options?.onSuccess?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось удалить преподавателя")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}
