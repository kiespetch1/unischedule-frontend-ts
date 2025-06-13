import { apiFetch } from "@/api/api-fetch.ts"
import { getGroupsUrl } from "@/api/urls.ts"

export interface GroupCreateParameters {
    name: string
    grade: number | null
    has_fixed_subgroups: boolean
    last_academic_week_number: number
}

export const createGroup = async (values: GroupCreateParameters) => {
    const response = await apiFetch(getGroupsUrl(), {
        method: "POST",
        body: JSON.stringify(values),
    })
    return response.json()
} 