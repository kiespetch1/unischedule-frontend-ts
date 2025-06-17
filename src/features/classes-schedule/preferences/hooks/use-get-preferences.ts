import { useQuery } from "@tanstack/react-query"
import { getPreferences, PreferenceWithId } from "@/features/classes-schedule/preferences/get-preferences.ts"
import { preferencesKey } from "@/utils/query-keys"

export const useGetPreferences = (userId: string) => {
    return useQuery<PreferenceWithId[]>({
        queryKey: [preferencesKey, userId],
        queryFn: () => getPreferences(userId),
        enabled: !!userId,
    })
} 