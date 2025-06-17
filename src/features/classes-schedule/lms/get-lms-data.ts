import { apiFetch } from "@/api/api-fetch.ts"
import { getLmsDataUrl } from "@/api/urls.ts"
import { LmsData, LmsDataResponse } from "../types/classes-types.ts"

export const getLmsData = async (groupId: string): Promise<LmsData[]> => {
    const response = await apiFetch(`${getLmsDataUrl()}?group_id=${groupId}`, {
        method: "GET",
    })
    if (response.ok) {
        const result = await response.json() as LmsDataResponse
        return result.data
    }
    throw new Error("Failed to get LMS data")
} 