import { useQuery } from "@tanstack/react-query"
import { getPreferences, PreferenceWithId } from "@/features/classes-schedule/preferences/get-preferences.ts"
import { preferencesKey } from "@/utils/query-keys"

export const useGetPreferences = () => {
    return useQuery<PreferenceWithId[]>({
        queryKey: [preferencesKey],
        queryFn: getPreferences,
    })
} 