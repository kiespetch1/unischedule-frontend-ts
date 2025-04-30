import { RequestParams, RequestSortOrderParam } from "@/types/request-params";

export interface RequestParamsDto<TSortBy extends string = string> {
  search?: string | null;
  offset?: number | null;
  limit?: number | null;
  sortOrder?: RequestSortOrderParam | null;
  sortBy?: TSortBy | null;
}

export const toRequestParamsDto = <TSortBy extends string = string>(
  params: RequestParams<TSortBy>,
) => ({
  search: params.search,
  offset: params.offset,
  limit: params.limit,
  sort_order: params.sortOrder,
  sort_by: params.sortBy,
});
