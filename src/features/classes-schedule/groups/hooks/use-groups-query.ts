import { ApiQueryWithParams } from "@/types/api-query.ts"
import { GroupsRequestParams } from "@/features/classes-schedule/groups/types/groups-request-params.ts"
import { DataPage } from "@/types/data-page.ts"
import { GroupModel } from "@/features/classes-schedule/types/classes-types.ts"
import { useQuery } from "@tanstack/react-query"
import { getGroups } from "@/features/classes-schedule/groups/get-groups.ts"

const groupsKey = "groups"

export const useGetGroups: ApiQueryWithParams<GroupsRequestParams, DataPage<GroupModel>> = (
  params,
  options
) => useQuery({ queryKey: [groupsKey, params], queryFn: () => getGroups(params), ...options })
