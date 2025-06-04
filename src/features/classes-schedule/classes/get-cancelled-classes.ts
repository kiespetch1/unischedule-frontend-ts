import { getCancelledClassesByGroupIdUrl } from "@/api/urls.ts"
import { apiFetch } from "@/api/api-fetch.ts"
import { ClassModel } from "@/features/classes-schedule/types/classes-types.ts"
import { DataPage } from "@/types/data-page.ts"

export const getCancelledClassesByGroupId = async (groupId: string) => {
  const url = new URL(getCancelledClassesByGroupIdUrl(groupId))

  return apiFetch(url.href, { useCredentials: true, useXsrfProtection: true }).then(
    response => response.json() as Promise<DataPage<ClassModel>>
  )
}
