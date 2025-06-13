export type RequestSortOrderParam = "ascending" | "descending"

export interface RequestParameters<TSortBy extends string = string> {
  search?: string | null
  offset?: number | null
  limit?: number | null
  sortOrder?: RequestSortOrderParam | null
  sortBy?: TSortBy | null
}
