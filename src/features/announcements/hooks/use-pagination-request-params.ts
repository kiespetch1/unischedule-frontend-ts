import { useState } from "react"
import { RequestParams } from "@/types/request-params.ts"
import { AnnouncementPaginationState } from "@/features/announcements/types/announcement-pagination-state.ts"

export const usePaginationRequestParams = (limit: number) => {
  const [offset, setOffset] = useState(0)
  const paginationParams = { limit: limit, offset } satisfies RequestParams

  const paginationState = {
    page: Math.floor(offset / limit) + 1,
    onChangePage: (page: number) => setOffset((page - 1) * limit),
  } satisfies Partial<AnnouncementPaginationState>

  return { paginationParams, paginationState }
}
