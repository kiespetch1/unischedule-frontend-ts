import { ApiQueryWithParams } from "@/types/api-query.ts"
import { useQuery } from "@tanstack/react-query"
import { GroupModel } from "@/features/classes-schedule/types/classes-types.ts"
import { getGroupById } from "@/features/classes-schedule/groups/get-group-by-id.ts"
import { groupKey } from "@/utils/query-keys.ts"

export interface GetGroupByIdQueryParams {
  id: string
}

export const useGetGroupById: ApiQueryWithParams<GetGroupByIdQueryParams, GroupModel> = (
  { id },
  options
) =>
  useQuery({
    queryKey: [groupKey, id],
    queryFn: () => getGroupById(id),
    staleTime: 60 * 60_000,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    ...options,
  })
