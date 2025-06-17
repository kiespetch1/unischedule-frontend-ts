import { ApiMutation } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
    setPreferences,
    SetPreferencesParameters,
} from "@/features/classes-schedule/preferences/set-preferences.ts"
import { preferencesKey } from "@/utils/query-keys"
import toast from "react-hot-toast"

export const useSetPreferences: ApiMutation<SetPreferencesParameters, void> = options => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async values => setPreferences(values),
        onError: (err, _vars, context) => {
            toast.error("Не удалось сохранить предпочтения")
            options?.onError?.(err, _vars, context)
        },
        onSuccess: (...args) => {
            void queryClient.invalidateQueries({ queryKey: [preferencesKey] })
            toast.success("Предпочтения успешно сохранены")
            options?.onSuccess?.(...args)
        },
        ...options,
    })
} 