import { ApiMutationWithParams } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAnnouncement } from "@/features/announcements/update-announcement.ts"
import { AnnouncementUpdateModel } from "@/features/announcements/types/announcement-types.ts"
import { announcementsKey } from "@/utils/query-keys"
import toast from "react-hot-toast"

export interface UpdateAnnouncementParams {
  id: string
}

export const useUpdateAnnouncement: ApiMutationWithParams<
  UpdateAnnouncementParams,
  AnnouncementUpdateModel
> = ({ id }, options) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async values => updateAnnouncement(id, values),
    onSettled: (...args) => {
      void queryClient.invalidateQueries({ queryKey: [announcementsKey] })
      options?.onSettled?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось обновить объявление")
      options?.onError?.(err, _vars, context)
    },
    onSuccess: (...args) => {
      toast.success("Объявление обновлено")
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}
