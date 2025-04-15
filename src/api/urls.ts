import { SCHEDULE_URL } from "@/config/api.ts"

export const getGroupUrl = (groupId: number) => `${SCHEDULE_URL}/api/v1/groups/${groupId}`