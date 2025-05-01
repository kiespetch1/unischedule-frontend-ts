import { formatSearchParams } from "@/utils/formatters.ts"
import { GroupsRequestParams } from "@/features/classes-schedule/groups/types/groups-request-params.ts"
import { toRequestParamsDto } from "@/api/dto/request-params-dto"
import { DataPage } from "@/types/data-page"
import { GroupModel } from "../types/classes-types"
import { getGroupsUrl } from "@/api/urls.ts"
import { isNonNullable } from "@/utils/equality-comparers"
import { apiFetch } from "@/api/api-fetch"

const getSearchParams = (params: GroupsRequestParams) =>
  formatSearchParams({
    grade: params.grade,
    has_subgroups: params.has_subgroups,
    has_fixed_subgroups: params.has_fixed_subgroups,
    ...toRequestParamsDto(params),
  })

export const getGroups = async (params?: GroupsRequestParams): Promise<DataPage<GroupModel>> => {
  const url = new URL(getGroupsUrl())
  if (isNonNullable(params)) url.search = getSearchParams(params).toString()

  return apiFetch(url.href, { isPublic: true }).then(
    response => response.json() as Promise<DataPage<GroupModel>>
  )
}
