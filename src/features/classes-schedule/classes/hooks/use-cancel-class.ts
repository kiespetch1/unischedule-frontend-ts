import {
  ApiMutationOptions,
  ApiMutationResult,
  ApiMutationWithParams,
} from "@/types/api-mutation.ts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ApiError } from "@/api/api-error.ts"
import {
  cancelAllClassesByGroupId,
  cancelClass,
} from "@/features/classes-schedule/classes/cancel-class.ts"
import toast from "react-hot-toast"
import { ClassesClearParameters } from "@/features/classes-schedule/classes/hooks/use-class-query.ts"
import { cancelClassesByDays } from "@/features/classes-schedule/classes/cancel-classes.ts"
import { ApiQueryWithParams } from "@/types/api-query.ts"
import { DataPage } from "@/types/data-page.ts"
import { ClassWithDayModel } from "@/features/classes-schedule/types/classes-types.ts"
import { getCancelledClassesByGroupId } from "@/features/classes-schedule/classes/get-cancelled-classes.ts"
import { groupKey } from "@/utils/query-keys.ts"

export const useCancelClassesByGroupId: ApiMutationWithParams<
  Omit<ClassesClearParameters, "dayId">
> = <TContext = unknown>(
  { groupId }: Omit<ClassesClearParameters, "dayId">,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: async () => {
      await cancelAllClassesByGroupId(groupId)
    },
    onSuccess: (...args) => {
      toast.success("Все пары группы успешно отменены")
      void queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSuccess?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось отменить пары группы")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}

export interface ClassesCancelByDaysParameters {
  dayIds: string[]
  groupId: string
}

export interface ClassCancelParameters {
  classId: string
  groupId: string
}

export const useCancelClass: ApiMutationWithParams<ClassCancelParameters> = <TContext = unknown>(
  { classId, groupId }: ClassCancelParameters,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: () => cancelClass(classId),
    onSuccess: (...args) => {
      toast.success("Пара успешно отменена")
      void queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSuccess?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось отменить пару")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}

export const useCancelClassesByDays: ApiMutationWithParams<ClassesCancelByDaysParameters> = <
  TContext = unknown,
>(
  { dayIds, groupId }: ClassesCancelByDaysParameters,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: async () => {
      await cancelClassesByDays(dayIds)
    },
    onSuccess: (...args) => {
      toast.success("Пары успешно отменены")
      void queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSuccess?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось отменить пары")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}

export interface CancelledClassesByGroupIdParams {
  groupId: string
}

export const useGetCancelledClassesByGroupId: ApiQueryWithParams<
  CancelledClassesByGroupIdParams,
  DataPage<ClassWithDayModel>
> = ({ groupId }, options) =>
  useQuery({
    queryKey: [groupKey, "cancelled", groupId],
    queryFn: () => getCancelledClassesByGroupId(groupId),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    gcTime: 0,
    ...options,
  })
