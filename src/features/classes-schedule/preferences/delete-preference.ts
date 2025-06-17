import { apiFetch } from "@/api/api-fetch.ts"
import { getPreferenceByIdUrl } from "@/api/urls.ts"

export const deletePreference = async (id: string) => {
    const response = await apiFetch(getPreferenceByIdUrl(id), {
        method: "DELETE",
    })
    if (response.ok) {
        return
    }
    throw new Error("Failed to delete preference")
} 