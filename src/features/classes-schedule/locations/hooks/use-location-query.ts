import { ApiMutation } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  LocationCreateModel,
  createLocation,
} from "@/features/classes-schedule/locations/create-location.ts"
import toast from "react-hot-toast"
import { LocationModel } from "@/features/classes-schedule/types/classes-types.ts"
import { locationsKey } from "./use-locations-query.ts"

export const useCreateLocation: ApiMutation<LocationCreateModel, LocationModel> = (options) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async values => {
      return createLocation(values)
    },
    onSettled: (...args) => {
      void queryClient.invalidateQueries({ queryKey: [locationsKey] })
      options?.onSettled?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось добавить локацию")
      options?.onError?.(err, _vars, context)
    },
    onSuccess: (...args) => {
      toast.success("Локация успешно добавлена")
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}