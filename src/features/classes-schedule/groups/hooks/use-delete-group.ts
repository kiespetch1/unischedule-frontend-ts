import {
  ApiMutationOptions,
  ApiMutationResult,
  ApiMutationWithParams,
} from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteGroup } from "../delete-group.ts"
import { ApiError } from "@/api/api-error.ts"
import { groupsKey } from "@/utils/query-keys.ts"
import toast from "react-hot-toast"

export interface DeleteGroupParams {
  id: string
}

export const useDeleteGroup: ApiMutationWithParams<DeleteGroupParams> = <TContext = unknown>(
  { id }: DeleteGroupParams,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: async () => {
      await deleteGroup(id)
    },
    onSuccess: async (...args) => {
      toast.success("Группа успешно удалена")
      await queryClient.invalidateQueries({ queryKey: [groupsKey] })
      if (options?.onSuccess) {
        await options.onSuccess(...args)
      }
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось удалить группу")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}
