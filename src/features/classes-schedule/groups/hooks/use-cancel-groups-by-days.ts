import { ApiMutationOptions, ApiMutationResult, ApiMutationWithParams } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelGroupsByDays, GroupsCancelDaysData } from "../cancel-groups-by-days.ts"
import { ApiError } from "@/api/api-error.ts"
import toast from "react-hot-toast"

const groupKey = "group"

export const useCancelGroupsByDays: ApiMutationWithParams<GroupsCancelDaysData> = <TContext = unknown>(
  params: GroupsCancelDaysData,
  options?: ApiMutationOptions<void, void, TContext>,
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: async () => {
      await cancelGroupsByDays(params)
    },
    onSuccess: (...args) => {
      toast.success("Пары успешно отменены")
      void queryClient.invalidateQueries({ queryKey: [groupKey] })
      options?.onSuccess?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось отменить пары")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}
