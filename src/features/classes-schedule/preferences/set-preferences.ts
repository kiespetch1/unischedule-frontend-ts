import { apiFetch } from "@/api/api-fetch.ts"
import { getPreferencesUrl } from "@/api/urls.ts"
import { Subgroup } from "../types/classes-types"

export interface PreferenceParameter {
    class_name: string
    subgroup: Subgroup
}

export interface SetPreferencesParameters {
    filtering_parameters: PreferenceParameter[]
}

export const setPreferences = async (values: SetPreferencesParameters) => {
    const response = await apiFetch(getPreferencesUrl(), {
        method: "POST",
        body: JSON.stringify(values),
    })
    if (response.ok) {
        return
    }
    throw new Error("Failed to set preferences")
} 