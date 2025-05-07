import {
  ApiMutationOptions,
  ApiMutationResult,
  ApiMutationWithParams,
} from "@/types/api-mutation.ts"
import {
  ClassCreateModel,
  ClassEditModelFlat,
} from "@/features/classes-schedule/dto/edit-class-model.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
import { clearClasses } from "@/features/classes-schedule/classes/clear-classes.ts"

const groupKey = "group"

interface ClassMutateParameters {
  classData: ClassModel
  group_id: string
}

interface ClassCreateParameters {
  group_id: string
}

export const useCreateClass: ApiMutationWithParams<ClassCreateParameters, ClassCreateModel> = (
  { group_id },
  options
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async editModel => {
      return createClass(editModel)
    },
    onSettled: (...args) => {
      queryClient.invalidateQueries({ queryKey: [groupKey, group_id] })
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
    retry: 3,
    ...options,
  })
}

export const useUpdateClass: ApiMutationWithParams<ClassMutateParameters, ClassEditModelFlat> = (
  { classData, group_id },
  options
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async editModel => {
      return updateClass(classData.id, editModel)
    },
    onSettled: (...args) => {
      queryClient.invalidateQueries({ queryKey: [groupKey, group_id] })
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
    retry: 3,
    ...options,
  })
}

interface DeleteClassContext {
  previousGroup?: GroupModel
}

export const useDeleteClass: ApiMutationWithParams<ClassMutateParameters> = <TContext = unknown>(
  { classData, group_id }: ClassMutateParameters,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    onMutate: async (): Promise<TContext> => {
      await queryClient.cancelQueries({ queryKey: [groupKey, group_id] })

      const previousGroup = queryClient.getQueryData<GroupModel>([groupKey, group_id])

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
        queryClient.setQueryData([groupKey, group_id], updated)
      }

      return { previousGroup } as unknown as TContext
    },
    mutationFn: () => deleteClass(classData.id),
    onError: (err, _vars, context) => {
      const ctx = context as unknown as DeleteClassContext | undefined
      if (ctx?.previousGroup) {
        queryClient.setQueryData([groupKey, group_id], ctx.previousGroup)
      }
      toast.error("Не удалось удалить пару")
      options?.onError?.(err, _vars, context)
    },
    onSettled: (...args) => {
      queryClient.invalidateQueries({ queryKey: [groupKey, group_id] })
      options?.onSettled?.(...args)
    },

    onSuccess: (...args) => {
      toast.success("Пара успешно удалена")
      options?.onSuccess?.(...args)
    },
    retry: 3,
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
    retry: 3,
    ...options,
  })
}

export interface ClassesClearParameters {
  dayId: string
  groupId: string
}

export const useClearClasses: ApiMutationWithParams<ClassesClearParameters> = <TContext = unknown>(
  { dayId, groupId }: ClassesClearParameters,
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: async () => {
      await clearClasses(dayId)
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
    retry: 3,
    ...options,
  })
}
