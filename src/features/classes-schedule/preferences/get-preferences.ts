import { apiFetch } from "@/api/api-fetch.ts"
import { getPreferencesUrl } from "@/api/urls.ts"
import { PreferenceParameter } from "./set-preferences.ts"

export interface PreferenceWithId extends PreferenceParameter {
    id: string
    created_at: string
    created_by: string
}

interface PreferencesResponse {
    data: PreferenceWithId[]
    total_count: number
}

export const getPreferences = async (userId: string) => {
    if (!userId) {
        throw new Error("User ID is required")
    }
    const response = await apiFetch(getPreferencesUrl(userId), {
        method: "GET",
    })
    const result = await response.json() as PreferencesResponse
    return result.data
} 