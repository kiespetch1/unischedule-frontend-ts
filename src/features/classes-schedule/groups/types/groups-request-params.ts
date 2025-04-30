import { RequestParams } from "@/types/request-params"

export type GroupsSortBy = "name" | "grade"

export interface GroupsRequestParams extends RequestParams<GroupsSortBy> {
  grade?: number | null
  has_subgroups?: boolean | null
  has_fixed_subgroups?: boolean | null
}
