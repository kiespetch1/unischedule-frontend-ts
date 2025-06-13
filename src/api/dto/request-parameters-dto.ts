import { RequestParameters, RequestSortOrderParam } from "@/types/request-parameters.ts"

export interface RequestParametersDto<TSortBy extends string = string> {
  search?: string | null
  offset?: number | null
  limit?: number | null
  sortOrder?: RequestSortOrderParam | null
  sortBy?: TSortBy | null
}

export const toRequestParametersDto = <TSortBy extends string = string>(
  params: RequestParameters<TSortBy>
) => ({
  search: params.search,
  offset: params.offset,
  limit: params.limit,
  sort_order: params.sortOrder,
  sort_by: params.sortBy,
})

export const extendRequestParamsDto = <T extends Record<string, unknown>>(
  baseDto: RequestParametersDto,
  additionalParams: T
) => ({
  ...baseDto,
  ...Object.entries(additionalParams).reduce(
    (acc, [key, value]) => ({ ...acc, [key.replace(/([A-Z])/g, "_$1").toLowerCase()]: value }),
    {}
  ),
})
