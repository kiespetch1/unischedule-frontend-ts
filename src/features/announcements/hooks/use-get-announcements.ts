import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query"
import { DataPage } from "@/types/data-page.ts"
import { getAnnouncements } from "@/features/announcements/get-announcements.ts"
import { AnnouncementsRequestParams } from "@/features/announcements/types/announcements-request-params.ts"
import { AnnouncementModel } from "@/features/classes-schedule/types/classes-types.ts"
import type { InfiniteData } from "@tanstack/query-core"
import { announcementsKey } from "@/utils/query-keys"

export type GetInfiniteQueryOptions = UseInfiniteQueryOptions<
  DataPage<AnnouncementModel>,
  Error,
  InfiniteData<DataPage<AnnouncementModel>>,
  DataPage<AnnouncementModel>,
  [typeof announcementsKey, string],
  number
>

export type GetInfiniteQueryParams = Omit<AnnouncementsRequestParams, "offset"> & {
  limit: number
  groupId: string
}

export function useGetAnnouncements(
  params: GetInfiniteQueryParams,
  options?: GetInfiniteQueryOptions
) {
  return useInfiniteQuery({
    queryKey: [announcementsKey, params.groupId],
    queryFn: async ({ pageParam = 0 }) =>
      getAnnouncements({ ...params, offset: pageParam, sortBy: "CreatedAt", sortOrder: "descending" }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * params.limit
      return nextOffset < lastPage.total_count ? nextOffset : undefined
    },
    staleTime: 60 * 60_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    ...options,
  })
}