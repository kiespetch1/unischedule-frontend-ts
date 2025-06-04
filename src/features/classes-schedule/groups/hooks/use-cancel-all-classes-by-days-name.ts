import { ApiMutationOptions, ApiMutationResult, ApiMutationWithParams } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiError } from "@/api/api-error.ts"
import toast from "react-hot-toast"
import { cancelAllClassesByDaysName, GroupsCancelDaysData } from "../../classes/cancel-class"

const groupKey = "group"

export const useCancelAllClassesByDaysName: ApiMutationWithParams<GroupsCancelDaysData> = <TContext = unknown>(
  params: GroupsCancelDaysData,
  options?: ApiMutationOptions<void, void, TContext>,
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: async () => {
      await cancelAllClassesByDaysName(params)
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
