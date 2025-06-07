import { ApiMutationOptions, ApiMutationResult, ApiMutationWithParams } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ClassesScheduleImportParameters, importClasses } from "../import-classes.ts"
import { ApiError } from "@/api/api-error.ts"
import toast from "react-hot-toast"
import { groupKey } from "@/utils/query-keys.ts"

export const useImportClasses: ApiMutationWithParams<
  ClassesScheduleImportParameters
> = <TContext = unknown>(
  { groupId, url }: ClassesScheduleImportParameters,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: async () => {
      await importClasses({ groupId, url })
    },
    onSuccess: (...args) => {
      toast.success("Расписание успешно импортировано")
      void queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSuccess?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось импортировать расписание")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}
