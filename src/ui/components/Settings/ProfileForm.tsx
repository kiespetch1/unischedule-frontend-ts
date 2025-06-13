import { FC } from "react"
import { useGetAccountInfo } from "@/features/account/hooks/use-get-account-info"
import { GroupModel } from "@/features/classes-schedule/types/classes-types"
import { Label } from "@/ui/basic/label.tsx"
import { Skeleton } from "@/ui/basic/skeleton.tsx"
import { Input } from "@/ui/basic/input.tsx"
import { getRussianRoleName } from "../DaysBlock/formatters"
import { useGetGroups } from "@/features/classes-schedule/groups/hooks/use-groups-query"
import { defaultExtendedUser } from "@/utils/default-entities.ts"

export const ProfileForm: FC = () => {
  const {
    data: accountData,
    isLoading: isAccountLoading,
    error: accountError,
  } = useGetAccountInfo()
  const userData = accountData?.data || defaultExtendedUser

  const { data: groupsData, isLoading: isGroupsLoading } = useGetGroups(
    {
      ids: userData
        ? [userData.group_id, ...(userData.managed_group_ids || [])].filter(Boolean)
        : [],
      fetch_details: false,
    },
    { enabled: !!userData }
  )

  const groupData = groupsData?.data.find((g: GroupModel) => g.id === userData?.group_id)
  const managedGroups =
    groupsData?.data.filter((g: GroupModel) => userData?.managed_group_ids?.includes(g.id)) || []

  if (isGroupsLoading || isAccountLoading) {
    return (
      <div className="flex w-[450px] flex-col gap-y-4">
        <p className="font-raleway text-lg/6 font-medium">Личные данные</p>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex flex-col gap-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-[36px] w-[210px]" />
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <Skeleton className="w-37 h-4" />
          <div className="flex w-full flex-row flex-wrap gap-2">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-[36px] w-[128px]" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (accountError) {
    return (
      <div className="flex flex-col gap-y-2">
        <p className="font-raleway pb-2 text-lg/6 font-medium">Личные данные</p>
        <div className="text-red-500">{accountError.message}</div>
      </div>
    )
  }

  console.log(managedGroups.length === 0)
  console.log(userData.role.toLowerCase() == "admin")
  return (
    <div className="flex w-[450px] flex-col gap-y-4">
      <p className="font-raleway text-lg/6 font-medium">Личные данные</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-y-2">
          <Label>Фамилия</Label>
          <Input
            value={userData.surname || ""}
            disabled
            className="font-raleway w-[210px] bg-gray-50"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Имя</Label>
          <Input
            value={userData.name || ""}
            disabled
            className="font-raleway w-[210px] bg-gray-50"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Отчество</Label>
          <Input
            value={userData.patronymic || ""}
            disabled
            className="font-raleway w-[210px] bg-gray-50"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Почта</Label>
          <Input
            value={userData.email || ""}
            disabled
            className="font-raleway w-[210px] bg-gray-50"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Роль</Label>
          <Input
            value={getRussianRoleName(userData.role)}
            disabled
            className="font-raleway w-[210px] bg-gray-50"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Группа</Label>
          {groupData && (
            <div className="w-[210px]">
              <GroupBadge group={groupData} />
            </div>
          )}
        </div>
      </div>

      {userData.role.toLowerCase() === "admin" || userData.role.toLowerCase() === "staff" ? (
        <div className="flex flex-col gap-y-2">
          <Label>Доступны все группы для управления</Label>
        </div>
      ) : (
        managedGroups.length > 0 && (
          <div className="flex w-full flex-col gap-y-2">
            <Label>Управляемые группы</Label>
            <div className="flex w-full flex-row flex-wrap gap-2">
              {managedGroups.map(group => (
                <GroupBadge key={group.id} group={group} />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  )
}

interface GroupCardProps {
  group: GroupModel
}

const GroupBadge: FC<GroupCardProps> = ({ group }) => {
  return (
    <div className="flex items-center justify-between gap-x-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
      <div className="font-raleway text-sm">{group.name}</div>
      <div className="font-raleway text-xs text-gray-500">{group.grade} курс</div>
    </div>
  )
}
