import { ApiMutationWithParams } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteLocation } from "@/features/classes-schedule/locations/delete-location.ts"
import { locationsKey } from "./use-locations-query.ts"
import toast from "react-hot-toast"

export interface DeleteLocationParams {
    id: string
}

export const useDeleteLocation: ApiMutationWithParams<DeleteLocationParams> = (
    { id },
    options
) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => deleteLocation(id),
        onSuccess: async (...args) => {
            toast.success("Локация удалена")
            await queryClient.invalidateQueries({ queryKey: [locationsKey] })
            options?.onSuccess?.(...args)
        },
        onError: (err, _vars, context) => {
            toast.error("Не удалось удалить локацию")
            options?.onError?.(err, _vars, context)
        },
        ...options,
    })
} 