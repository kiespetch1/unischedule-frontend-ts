import { getLocationsUrl } from "@/api/urls.ts"
import { apiFetch } from "@/api/api-fetch.ts"
import { DataPage } from "@/types/data-page.ts"
import { LocationModel } from "@/features/classes-schedule/types/classes-types.ts"

export const getLocations = async () => {
  const url = new URL(getLocationsUrl())
  return apiFetch(url.href, { useCredentials: false, useXsrfProtection: false }).then(
    response => response.json() as Promise<DataPage<LocationModel>>
  )
}
