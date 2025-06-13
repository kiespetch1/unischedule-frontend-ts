import { ApiMutationWithParams } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateLocation } from "@/features/classes-schedule/locations/update-location.ts"
import { LocationCreateModel } from "@/features/classes-schedule/locations/create-location.ts"
import { locationsKey } from "./use-locations-query.ts"
import toast from "react-hot-toast"

export interface UpdateLocationParams {
  id: string
}

export const useUpdateLocation: ApiMutationWithParams<UpdateLocationParams, LocationCreateModel> = (
  { id },
  options
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async values => updateLocation(id, values),
    onSettled: (...args) => {
      void queryClient.invalidateQueries({ queryKey: [locationsKey] })
      options?.onSettled?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось обновить локацию")
      options?.onError?.(err, _vars, context)
    },
    onSuccess: (...args) => {
      toast.success("Локация обновлена")
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}
