import { ApiMutation } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePreference } from "@/features/classes-schedule/preferences/delete-preference.ts"
import { preferencesKey } from "@/utils/query-keys"
import toast from "react-hot-toast"

export const useDeletePreference: ApiMutation<string, void> = options => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async id => deletePreference(id),
        onError: (err, _vars, context) => {
            toast.error("Не удалось удалить предпочтение")
            options?.onError?.(err, _vars, context)
        },
        onSuccess: (...args) => {
            void queryClient.invalidateQueries({ queryKey: [preferencesKey] })
            toast.success("Предпочтение успешно удалено")
            options?.onSuccess?.(...args)
        },
        ...options,
    })
} 