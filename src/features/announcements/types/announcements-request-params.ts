import { RequestParams } from "@/types/request-params.ts"

export type AnnouncementsSortBy = "CreatedAt"

export interface AnnouncementsRequestParams extends RequestParams<AnnouncementsSortBy> {
  groupId: string
}
