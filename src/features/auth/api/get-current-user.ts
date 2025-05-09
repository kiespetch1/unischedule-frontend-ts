import { apiFetch } from "@/api/api-fetch"
import { getCurrentUserUrl } from "@/api/urls"
import { UserExtendedModel } from "@/features/classes-schedule/types/classes-types"
import { Result } from "@/types/result-types"

export interface CurrentUserResponse {
  isAuthenticated: boolean
  data: UserExtendedModel | null
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  try {
    const res = await apiFetch(getCurrentUserUrl(), {
      method: "GET",
      useCredentials: true,
      useXsrfProtection: false,
    })

    if (!res.ok) {
      return { isAuthenticated: false, data: null }
    }

    const result = (await res.json()) as Result<UserExtendedModel>

    return { isAuthenticated: true, data: result.data }
  } catch {
    return { isAuthenticated: false, data: null }
  }
}
