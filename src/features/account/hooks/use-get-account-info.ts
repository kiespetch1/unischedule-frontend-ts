import { ApiQuery } from "@/types/api-query.ts"
import { useQuery } from "@tanstack/react-query"
import { getAccountInfo } from "@/features/account/get-account.ts"
import { CurrentUserResponse } from "@/features/auth/api/get-current-user"

export const useGetAccountInfo: ApiQuery<CurrentUserResponse> = options => {
  return useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      return await getAccountInfo()
    },
    ...options,
  })
}
