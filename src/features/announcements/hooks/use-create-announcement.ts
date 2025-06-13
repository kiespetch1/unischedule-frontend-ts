import { ApiMutation } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnnouncement } from "@/features/announcements/create-announcement.ts"
import { AnnouncementCreateParameters } from "@/features/announcements/types/announcement-types.ts"
import { AnnouncementModel } from "@/features/classes-schedule/types/classes-types.ts"
import { announcementsKey } from "@/utils/query-keys"
import toast from "react-hot-toast"

export const useCreateAnnouncement: ApiMutation<
  AnnouncementCreateParameters,
  AnnouncementModel
> = options => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async values => createAnnouncement(values),
    onSettled: (...args) => {
      void queryClient.invalidateQueries({ queryKey: [announcementsKey] })
      options?.onSettled?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось создать объявление")
      options?.onError?.(err, _vars, context)
    },
    onSuccess: (...args) => {
      toast.success("Объявление создано")
      options?.onSuccess?.(...args)
    },
    ...options,
  })
}
