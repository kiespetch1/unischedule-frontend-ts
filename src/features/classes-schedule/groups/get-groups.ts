import { formatSearchParameters } from "@/utils/formatters.ts"
import { GroupsRequestParameters } from "@/features/classes-schedule/groups/types/groups-request-parameters.ts"
import { toRequestParametersDto } from "@/api/dto/request-parameters-dto.ts"
import { DataPage } from "@/types/data-page"
import { GroupModel } from "../types/classes-types"
import { getGroupsUrl } from "@/api/urls.ts"
import { isNonNullable } from "@/utils/equality-comparers"
import { apiFetch } from "@/api/api-fetch"

const getSearchParameters = (parameters: GroupsRequestParameters) =>
  formatSearchParameters({
    ids: parameters.ids,
    grade: parameters.grade,
    has_subgroups: parameters.has_subgroups,
    has_fixed_subgroups: parameters.has_fixed_subgroups,
    fetch_details: parameters.fetch_details,
    ...toRequestParametersDto(parameters),
  })

export const getGroups = async (
  params?: GroupsRequestParameters
): Promise<DataPage<GroupModel>> => {
  const url = new URL(getGroupsUrl())
  if (isNonNullable(params)) url.search = getSearchParameters(params).toString()

  return apiFetch(url.href, { useCredentials: false, useXsrfProtection: false }).then(
    response => response.json() as Promise<DataPage<GroupModel>>
  )
}
