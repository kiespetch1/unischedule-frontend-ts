import { GroupModel } from "@/features/classes-schedule/types/classes-types.ts"
import { apiFetch } from "@/api/api-fetch.ts"
import { getGroupByIdUrl } from "@/api/urls.ts"

export const getGroupById = async (id: string): Promise<GroupModel> =>
  apiFetch(getGroupByIdUrl(id), { useXsrfProtection: false })
    .then(response => response.json())
    .then(json => json.data as GroupModel)
