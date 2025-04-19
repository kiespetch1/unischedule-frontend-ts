export interface AccessToken {
  token: string
  expires: number
}

export interface TokenModel {
  access_token: string
  expired_at: string
  scheme: string
  return_url: string
}
