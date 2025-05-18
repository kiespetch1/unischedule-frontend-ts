import { DataPage } from "@/types/data-page.ts"
import { ApiQueryWithParams } from "@/types/api-query.ts"
import { useQuery } from "@tanstack/react-query"
import { getAnnouncements } from "@/features/announcements/get-announcements.ts"
import { AnnouncementsRequestParams } from "@/features/announcements/types/announcements-request-params.ts"
import { AnnouncementModel } from "@/features/classes-schedule/types/classes-types.ts"

export const announcementsKey = "announcements";

export const useGetAnnouncements: ApiQueryWithParams<
  AnnouncementsRequestParams,
  DataPage<AnnouncementModel>
> = (params, options) =>
  useQuery({
    queryKey: [announcementsKey, params.groupId],
    queryFn: () => getAnnouncements(params),
    staleTime: 60 * 60_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    ...options,
  });