import { useGetGroups } from "@/features/classes-schedule/groups/hooks/use-groups-query"
import { GroupsList } from "@components/GroupsList/GroupsList.tsx"
import { FC, useState, MouseEvent } from "react"
import { useAuth } from "@/features/auth/context/auth-context.tsx"
import { GroupModel } from "@/features/classes-schedule/types/classes-types.ts"
import { Arrow } from "@radix-ui/react-popover"
import { ArrowBigLeftDash, ArrowLeftIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/basic/breadcrumb.tsx"

export const SettingsPage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [isEditingGroup, setIsEditingGroup] = useState(false)
  const { data: groups, isLoading } = useGetGroups({ grade: null })
  const { authState } = useAuth()
  console.log(authState.userData?.role)

  if (isLoading) {
    return <div>Loading...</div>
  }

  const filteredGroups =
    authState.userData?.role === "Admin"
      ? groups!.data
      : groups!.data.filter(group => authState.userData!.managed_group_ids!.includes(group.id))

  const handleGroupClick = (groupId: string) => {
    setSelectedGroupId(groupId)
    setIsEditingGroup(true)
  }

  return (
    <div className="mx-8 flex flex-col items-start gap-6">
      <p className="font-raleway text-2xl/6 font-medium">Управление</p>
      <div className="flex flex-col">
        <GroupEditBlock
          isEditingGroup={isEditingGroup}
          selectedGroupId={selectedGroupId}
          setSelectedGroupId={setSelectedGroupId}
          loading={isLoading}
          groups={filteredGroups}
          onGroupClick={handleGroupClick}
          setIsEditingGroup={setIsEditingGroup}
        />
      </div>
      <p className="font-raleway text-xl/6 font-medium">Профиль</p>
    </div>
  )
}

export interface GroupEditBlockProps {
  isEditingGroup: boolean
  selectedGroupId: string | null
  setSelectedGroupId: (groupId: string | null) => void
  loading: boolean
  groups: GroupModel[]
  onGroupClick?: (groupId: string, event: MouseEvent) => void
  setIsEditingGroup: (isEditingGroup: boolean) => void
}

export const GroupEditBlock: FC<GroupEditBlockProps> = ({
  isEditingGroup,
  selectedGroupId,
  setSelectedGroupId,
  loading,
  groups,
  onGroupClick,
  setIsEditingGroup,
}) => {
  if (isEditingGroup) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-start">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => {
                    setIsEditingGroup(false)
                    setSelectedGroupId(null)
                  }}>
                  Управление группами
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => {
                    setIsEditingGroup(false)
                    setSelectedGroupId(null)
                  }}>
                  Список групп
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <button
            className="flex cursor-pointer flex-row gap-2"
            onClick={() => {
              setIsEditingGroup(false)
            }}>
            <ArrowLeftIcon />
            <p className="font-raleway">Вернуться к выбору групп</p>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => {
                setSelectedGroupId(null)
              }}>
              Управление группами
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Список групп</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <GroupsList groups={groups} loading={loading} onGroupClick={onGroupClick} />
    </div>
  )
}
