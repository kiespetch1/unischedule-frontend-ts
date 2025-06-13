import { RequestParameters } from "@/types/request-parameters.ts"

export type GroupsSortBy = "name" | "grade"

export interface GroupsRequestParameters extends RequestParameters<GroupsSortBy> {
  ids?: string[]
  grade?: number | null
  has_subgroups?: boolean | null
  has_fixed_subgroups?: boolean | null
  fetch_details: boolean
}
