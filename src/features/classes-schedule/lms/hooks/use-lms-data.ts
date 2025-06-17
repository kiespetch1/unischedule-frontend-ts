import { ApiMutation } from "@/types/api-mutation.ts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LmsData, LmsDataCreateParameters } from "../../types/classes-types.ts"
import toast from "react-hot-toast"
import { createLmsData } from "../create-lms-data.ts"
import { getLmsData } from "../get-lms-data.ts"
import { updateLmsData } from "@/features/classes-schedule/lms/update-lms-data.ts"
import { deleteLmsData } from "@/features/classes-schedule/lms/delete-lms-data.ts"

const lmsDataKey = "lms-data"

export const useLmsData = (groupId: string) => {
  return useQuery({
    queryKey: [lmsDataKey, groupId],
    queryFn: () => getLmsData(groupId)
  })
}

export const useCreateLmsData: ApiMutation<LmsDataCreateParameters, LmsData> = options => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createLmsData,
    onError: (err, _vars, context) => {
      toast.error("Не удалось создать данные LMS")
      options?.onError?.(err, _vars, context)
    },
    onSuccess: (...args) => {
      void queryClient.invalidateQueries({ queryKey: [lmsDataKey] })
      toast.success("Данные LMS успешно созданы")
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}

export const useUpdateLmsData: ApiMutation<
  { id: string; data: LmsDataCreateParameters },
  void
> = options => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => updateLmsData(id, data),
    onError: (err, _vars, context) => {
      toast.error("Не удалось обновить данные LMS")
      options?.onError?.(err, _vars, context)
    },
    onSuccess: (...args) => {
      void queryClient.invalidateQueries({ queryKey: [lmsDataKey] })
      toast.success("Данные LMS успешно обновлены")
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}

export const useDeleteLmsData: ApiMutation<string, void> = options => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteLmsData,
    onError: (err, _vars, context) => {
      toast.error("Не удалось удалить данные LMS")
      options?.onError?.(err, _vars, context)
    },
    onSuccess: (...args) => {
      void queryClient.invalidateQueries({ queryKey: [lmsDataKey] })
      toast.success("Запись о данных курса в LMS успешно удалена")
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}
