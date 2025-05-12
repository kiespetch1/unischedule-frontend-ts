import { apiFetch } from "@/api/api-fetch.ts"
import { getLocationsUrl } from "@/api/urls.ts"
import { LocationModel } from "@/features/classes-schedule/types/classes-types.ts"

export interface LocationCreateModel {
  name: string
  type: "irl" | "online"
  link?: string | null
}

export const createLocation = async (values: LocationCreateModel): Promise<LocationModel> => {
  const response = await apiFetch(getLocationsUrl(), { 
    method: "POST", 
    body: JSON.stringify(values) 
  })
  return response.json()
}