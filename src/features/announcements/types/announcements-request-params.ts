import { RequestParams } from "@/types/request-params.ts"

export type AnnouncementsSortBy = "created_at"

export interface AnnouncementsRequestParams extends RequestParams<AnnouncementsSortBy> {
  groupId: string
}
