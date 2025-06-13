import { ApiMutationWithParams } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAnnouncement } from "@/features/announcements/delete-announcement.ts"
import { announcementsKey } from "@/utils/query-keys"
import toast from "react-hot-toast"

export interface DeleteAnnouncementParams {
  id: string
}

export const useDeleteAnnouncement: ApiMutationWithParams<DeleteAnnouncementParams> = (
  { id },
  options
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => deleteAnnouncement(id),
    onSuccess: async (...args) => {
      toast.success("Объявление удалено")
      await queryClient.invalidateQueries({ queryKey: [announcementsKey] })
      options?.onSuccess?.(...args)
    },
    onError: (err, _vars, context) => {
      toast.error("Не удалось удалить объявление")
      options?.onError?.(err, _vars, context)
    },
    ...options,
  })
}
