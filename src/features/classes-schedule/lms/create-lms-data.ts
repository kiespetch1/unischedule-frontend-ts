import { apiFetch } from "@/api/api-fetch.ts"
import { getLmsDataUrl } from "@/api/urls.ts"
import { LmsData, LmsDataCreateParameters } from "../types/classes-types.ts"

export const createLmsData = async (values: LmsDataCreateParameters): Promise<LmsData> => {
  const response = await apiFetch(getLmsDataUrl(), { method: "POST", body: JSON.stringify(values) })
  if (response.ok) {
    return (await response.json()) as LmsData
  }
  throw new Error("Failed to create LMS data")
}
