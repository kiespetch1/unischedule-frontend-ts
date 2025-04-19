import { AccessToken } from "../../types/access-token"

export interface TokenModel {
  access_token: string
  expired_at: string
  scheme: string
  return_url: string
}

export const fromTokenDto = ({ access_token, expired_at }: TokenModel): AccessToken => ({
  token: access_token,
  expires: Date.parse(expired_at),
})
