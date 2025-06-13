import { apiFetch } from "@/api/api-fetch.ts"
import { getGroupsPromoteUrl } from "@/api/urls.ts"

export const promoteGroups = async () => {
  await apiFetch(getGroupsPromoteUrl(), { method: "PATCH" })
}
