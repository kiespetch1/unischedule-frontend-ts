import { apiFetch } from "@/api/api-fetch.ts"
import { getLmsDataUrlById } from "@/api/urls.ts"
import { LmsDataCreateParameters } from "../types/classes-types.ts"

export const updateLmsData = async (id: string, values: LmsDataCreateParameters): Promise<void> => {
  const response = await apiFetch(getLmsDataUrlById(id), {
    method: "PUT",
    body: JSON.stringify(values),
  })
  if (!response.ok) {
    throw new Error("Failed to update LMS data")
  }
}
