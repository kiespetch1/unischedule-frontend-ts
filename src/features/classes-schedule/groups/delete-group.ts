import { apiFetch } from "@/api/api-fetch.ts"
import { getGroupByIdUrl } from "@/api/urls.ts"

export const deleteGroup = async (id: string) => {
  await apiFetch(getGroupByIdUrl(id), { method: "DELETE" })
}
