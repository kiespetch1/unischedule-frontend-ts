import { getAnnouncementsUrl } from "@/api/urls.ts"
import { DataPage } from "@/types/data-page.ts"
import { AnnouncementModel } from "@/features/classes-schedule/types/classes-types.ts"
import { apiFetch } from "@/api/api-fetch.ts"
import { AnnouncementsRequestParams } from "@/features/announcements/types/announcements-request-params.ts"
import { formatSearchParams } from "@/utils/formatters.ts"
import { toRequestParamsDto } from "@/api/dto/request-params-dto.ts"
import { isNonNullable } from "@/utils/equality-comparers.ts"

const getSearchParams = (params: AnnouncementsRequestParams) =>
  formatSearchParams(toRequestParamsDto(params))

export const getAnnouncements = async (params?: AnnouncementsRequestParams) => {
  const url = new URL(getAnnouncementsUrl())
  if(isNonNullable(params)) url.search = getSearchParams(params).toString()

  return apiFetch(url.href, { useCredentials: false, useXsrfProtection: false }).then(
    response => response.json() as Promise<DataPage<AnnouncementModel>>
  )
}
