import { apiFetch } from "@/api/api-fetch"
import { PermissionsResult } from "../types/auth-types"
import { getPermissionsUrl } from "@/api/urls.ts"
import { defaultPermissions } from "@/utils/default-entities"

export async function getPermissions(): Promise<PermissionsResult> {
  try {
    const response = await apiFetch(getPermissionsUrl(), { method: "GET", useCredentials: true })

    if (!response.ok) {
      return { data: defaultPermissions, error: `Error: ${response.status}` }
    }

    return await response.json()
  } catch (error) {
    return {
      data: defaultPermissions,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
