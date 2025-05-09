import { RoleType, UserExtendedModel } from "@/features/classes-schedule/types/classes-types.ts"
import { FC } from "react"
import { snakeCase } from "change-case"
import { getRussianRoleName } from "@components/DaysBlock/formatters.ts"
import { Button } from "@/components/ui/button.tsx"
import { defaultExtendedUser } from "@/utils/default-entities.ts"
import { useAuth } from "@/features/auth/context/auth-context"

export interface UserPanelProps {
  userData: UserExtendedModel | null
  onLogout: () => void
}

export const UserPanel: FC<UserPanelProps> = ({ userData, onLogout }) => {
  const { logout } = useAuth()
  const user: UserExtendedModel = userData ?? defaultExtendedUser
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="font-raleway text-base font-semibold">Вы вошли как:</div>
        <div className="font-raleway text-sm font-normal">{user.email}</div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="font-raleway text-base font-normal">Роль:</div>
        <div className="font-raleway text-sm font-normal">
          {getRussianRoleName(snakeCase(user.role) as RoleType)}
        </div>
      </div>
      <div className="flex w-full flex-row items-center gap-2">
        <Button type="button" className="w-1/2">
          Управление
        </Button>
        <Button
          type="button"
          variant="destructive"
          className="w-1/2"
          onClick={() => {
            logout()
            onLogout()
          }}>
          Выйти
        </Button>
      </div>
    </div>
  )
}
