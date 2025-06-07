import { ApiQueryWithParams } from "@/types/api-query.ts"
import { GroupsRequestParams } from "@/features/classes-schedule/groups/types/groups-request-params.ts"
import { DataPage } from "@/types/data-page.ts"
import { GroupModel } from "@/features/classes-schedule/types/classes-types.ts"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getGroups } from "@/features/classes-schedule/groups/get-groups.ts"
import { promoteGroups } from "@/features/classes-schedule/groups/promote-groups.ts"
import { ApiMutation, ApiMutationOptions, ApiMutationResult } from "@/types/api-mutation.ts"
import { ApiError } from "@/api/api-error.ts"
import toast from "react-hot-toast"
import { groupsKey } from "@/utils/query-keys.ts"

export const useGetGroups: ApiQueryWithParams<GroupsRequestParams, DataPage<GroupModel>> = (
  params,
  options
) => useQuery({ queryKey: [groupsKey, params], queryFn: () => getGroups(params), ...options })

export const usePromoteGroups: ApiMutation = <TContext = unknown>(
  options?: ApiMutationOptions<void, void, TContext>
): ApiMutationResult<void, void, TContext> => {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, void, TContext>({
    mutationFn: promoteGroups,
    onSettled: (...args) => {
      queryClient.invalidateQueries({ queryKey: [groupsKey] })
      options?.onSettled?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось обновить курс групп")
      options?.onError?.(err, _vars, context)
    },
    onSuccess: (...args) => {
      toast.success("Курс групп успешно обновлен")
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}
