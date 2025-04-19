import { apiFetch } from "@/api/api-fetch.ts"
import { getAccessTokenFromStorage } from "@/features/auth/utils/tokens.ts"
import { AccessToken } from "@/features/auth/types/access-token.ts"
import { getRefreshUrl } from "@/api/urls.ts"
import { fromTokenDto } from "@/features/auth/api/dto/token-model.ts"

export const refresh = async (): Promise<AccessToken> => {
  const accessToken = getAccessTokenFromStorage()

  if (accessToken === null) {
    throw new Error("Access токен не найден")
  }

  const response = await apiFetch(getRefreshUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: accessToken.token,
    refresh: false,
  }).then(response => response.json())

  return fromTokenDto(response.data)
}
