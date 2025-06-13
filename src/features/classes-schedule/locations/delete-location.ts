import { apiFetch } from "@/api/api-fetch.ts"
import { getLocationByIdUrl } from "@/api/urls.ts"

export const deleteLocation = async (id: string) => {
    await apiFetch(getLocationByIdUrl(id), { method: "DELETE" })
} 