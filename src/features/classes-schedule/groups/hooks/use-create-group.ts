import { ApiMutation } from "@/types/api-mutation.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
    createGroup,
    GroupCreateParameters,
} from "@/features/classes-schedule/groups/create-group.ts"
import { GroupModel } from "@/features/classes-schedule/types/classes-types.ts"
import { groupsKey } from "@/utils/query-keys"
import toast from "react-hot-toast"

export const useCreateGroup: ApiMutation<GroupCreateParameters, GroupModel> = options => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async values => createGroup(values),
        onError: (err, _vars, context) => {
            toast.error("Не удалось создать группу")
            options?.onError?.(err, _vars, context)
        },
        onSuccess: (...args) => {
            void queryClient.invalidateQueries({ queryKey: [groupsKey] })
            toast.success("Группа успешно создана")
            options?.onSuccess?.(...args)
        },
        ...options,
    })
}
