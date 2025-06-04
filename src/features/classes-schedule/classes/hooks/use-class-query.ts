import {
  ApiMutationOptions,
  ApiMutationResult,
  ApiMutationWithParams,
} from "@/types/api-mutation.ts"
import {
  ClassCreateModel,
  ClassEditModelFlat,
} from "@/features/classes-schedule/dto/edit-class-model.ts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { updateClass } from "@/features/classes-schedule/classes/update-class.ts"
import {
  ClassModel,
  DayModel,
  GroupModel,
  WeekModel,
} from "@/features/classes-schedule/types/classes-types.ts"
import { deleteClass } from "@/features/classes-schedule/classes/delete-class.ts"
import { ApiError } from "@/api/api-error.ts"
import toast from "react-hot-toast"
import { createClass } from "@/features/classes-schedule/classes/create-class.ts"
import { copyClasses } from "@/features/classes-schedule/classes/copy-classes.ts"
import {
  clearClassesByDayId,
  clearClassesByGroupId,
} from "@/features/classes-schedule/classes/clear-classes.ts"
import {
  cancelAllClassesByGroupId,
  cancelClass,
  restoreClass,
} from "@/features/classes-schedule/classes/cancel-class.ts"
import { cancelClassesByDays } from "@/features/classes-schedule/classes/cancel-classes.ts"
import { restoreClassesByIds } from "@/features/classes-schedule/classes/restore-classes.ts"
import { getCancelledClassesByGroupId } from "@/features/classes-schedule/classes/get-cancelled-classes"
import { ApiQueryWithParams } from "@/types/api-query.ts"
import { DataPage } from "@/types/data-page.ts"

const groupKey = "group"

interface ClassMutateParameters {
  classData: ClassModel
  groupId: string
}

interface ClassCreateParameters {
  groupId: string
}

export const useCreateClass: ApiMutationWithParams<ClassCreateParameters, ClassCreateModel> = (
  { groupId },
  options
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async editModel => {
      return createClass(editModel)
    },
    onSettled: (...args) => {
      queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSettled?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось создать пару")
      options?.onError?.(err, _vars, context)
    },
    onSuccess: (...args) => {
      toast.success("Пара успешно создана")
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}

export const useUpdateClass: ApiMutationWithParams<ClassMutateParameters, ClassEditModelFlat> = (
  { classData, groupId },
  options
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async editModel => {
      return updateClass(classData.id, editModel)
    },
    onSettled: (...args) => {
      queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSettled?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось обновить пару")
      options?.onError?.(err, _vars, context)
    },
    onSuccess: (...args) => {
      toast.success("Пара успешно обновлена")
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}

interface DeleteClassContext {
  previousGroup?: GroupModel
}

export const useDeleteClass: ApiMutationWithParams<ClassMutateParameters> = <TContext = unknown>(
  { classData, groupId }: ClassMutateParameters,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    onMutate: async (): Promise<TContext> => {
      await queryClient.cancelQueries({ queryKey: [groupKey, groupId] })

      const previousGroup = queryClient.getQueryData<GroupModel>([groupKey, groupId])

      if (previousGroup) {
        const updated: GroupModel = {
          ...previousGroup,
          weeks: previousGroup.weeks.map((w: WeekModel) => ({
            ...w,
            days: w.days.map((d: DayModel) => ({
              ...d,
              classes: d.classes?.filter(c => c.id !== classData.id) ?? null,
            })),
          })),
        }
        queryClient.setQueryData([groupKey, groupId], updated)
      }

      return { previousGroup } as unknown as TContext
    },
    mutationFn: () => deleteClass(classData.id),
    onError: (err, _vars, context) => {
      const ctx = context as unknown as DeleteClassContext | undefined
      if (ctx?.previousGroup) {
        queryClient.setQueryData([groupKey, groupId], ctx.previousGroup)
      }
      toast.error("Не удалось удалить пару")
      options?.onError?.(err, _vars, context)
    },
    onSettled: (...args) => {
      queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSettled?.(...args)
    },

    onSuccess: (...args) => {
      toast.success("Пара успешно удалена")
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}

export interface ClassesCopyParameters {
  dayId: string
  groupId: string
}

export const useCopyClasses: ApiMutationWithParams<ClassesCopyParameters> = <TContext = unknown>(
  { dayId, groupId }: ClassesCopyParameters,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: async () => {
      await copyClasses(dayId)
    },
    onSuccess: (...args) => {
      toast.success("Пары успешно скопированы")
      void queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSuccess?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось скопировать пары")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}

export interface ClassesClearParameters {
  dayId: string
  groupId: string
}

export const useClearClassesByDayId: ApiMutationWithParams<ClassesClearParameters> = <
  TContext = unknown,
>(
  { dayId, groupId }: ClassesClearParameters,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: async () => {
      await clearClassesByDayId(dayId)
    },
    onSuccess: (...args) => {
      toast.success("Все пары дня успешно удалены")
      void queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSuccess?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось удалить пары дня")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}

export const useClearClassesByGroupId: ApiMutationWithParams<
  Omit<ClassesClearParameters, "dayId">
> = <TContext = unknown>(
  { groupId }: Omit<ClassesClearParameters, "dayId">,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: async () => {
      await clearClassesByGroupId(groupId)
    },
    onSuccess: (...args) => {
      toast.success("Все пары группы успешно удалены")
      void queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSuccess?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось удалить пары группы")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}

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
    onSettled: (...args) => {
      queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSettled?.(...args)
    },
    ...options,
  })
}

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
    onSettled: (...args) => {
      queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSettled?.(...args)
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
    onSettled: (...args) => {
      toast.success("Пары успешно восстановлены")
      queryClient.invalidateQueries({ queryKey: [groupKey, groupId] })
      options?.onSettled?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось восстановить пары")
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
  DataPage<ClassModel>
> = ({ groupId }, options) =>
  useQuery({
    queryKey: [groupKey, "cancelled", groupId],
    queryFn: () => getCancelledClassesByGroupId(groupId),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    ...options,
  })
