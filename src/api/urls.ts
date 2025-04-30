import { IDENTITY_URL, SCHEDULE_URL } from "@/config/api.ts"

export const getLoginUrl = () => `${IDENTITY_URL}/api/v1/account/sign_in`

export const getRefreshUrl = () => `${IDENTITY_URL}/api/v1/account/refresh`

export const getGroupByIdUrl = (groupId: string) => `${SCHEDULE_URL}/api/v1/groups/${groupId}`

export const getGroupsUrl = () => `${SCHEDULE_URL}/api/v1/groups`
