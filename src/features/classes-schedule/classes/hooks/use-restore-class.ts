import {
  ApiMutationOptions,
  ApiMutationResult,
  ApiMutationWithParams,
} from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiError } from "@/api/api-error.ts"
import { restoreClass } from "@/features/classes-schedule/classes/cancel-class.ts"
import toast from "react-hot-toast"
import { restoreClassesByIds } from "@/features/classes-schedule/classes/restore-classes.ts"
import { ClassMutateParameters } from "@/features/classes-schedule/classes/hooks/use-class-query.ts"
import { groupKey } from "@/utils/query-keys.ts"

export const useRestoreClass: ApiMutationWithParams<ClassMutateParameters> = <TContext = unknown>(
  { classData, groupId }: ClassMutateParameters,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: () => restoreClass(classData.id),
    onSuccess: (...args) => {
      toast.success("Пара успешно восстановлена")
      void queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSuccess?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось восстановить пару")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}

export interface ClassesRestoreParams {
  classIds: string[]
  groupId: string
}

export const useRestoreClassesByIds = <TContext = unknown>(
  { classIds, groupId }: ClassesRestoreParams,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      return restoreClassesByIds(classIds)
    },
    onSuccess: (...args) => {
      toast.success("Пары успешно восстановлены")
      queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSuccess?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось восстановить пары")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}
