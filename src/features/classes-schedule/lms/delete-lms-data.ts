import { apiFetch } from "@/api/api-fetch.ts"
import { getLmsDataUrlById } from "@/api/urls.ts"

export const deleteLmsData = async (id: string): Promise<void> => {
    const response = await apiFetch(getLmsDataUrlById(id), {
        method: "DELETE",
    })
    if (response.ok) {
        return
    }
    throw new Error("Failed to delete LMS data")
} 