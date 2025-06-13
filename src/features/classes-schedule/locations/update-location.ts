import { apiFetch } from "@/api/api-fetch.ts"
import { getLocationByIdUrl } from "@/api/urls.ts"
import { LocationCreateModel } from "@/features/classes-schedule/locations/create-location.ts"

export const updateLocation = async (id: string, values: LocationCreateModel) => {
  await apiFetch(getLocationByIdUrl(id), { method: "PUT", body: JSON.stringify(values) })
}
