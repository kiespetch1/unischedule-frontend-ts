import { RequestParameters } from "@/types/request-parameters.ts"

export type AnnouncementsSortBy = "CreatedAt"

export interface AnnouncementsRequestParams extends RequestParameters<AnnouncementsSortBy> {
  groupId: string
}
