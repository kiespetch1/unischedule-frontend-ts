import { useEffect, useState } from "react"
import { useGetGroupById } from "@/features/classes-schedule/groups/hooks/use-group-query.ts"
import { Breadcrumbs } from "@/ui/components/common/Breadcrumbs.tsx"
import { Button } from "@/ui/basic/button.tsx"
import { GroupsList } from "@components/GroupsList/GroupsList.tsx"
import {
  useGetGroups,
  usePromoteGroups,
} from "@/features/classes-schedule/groups/hooks/use-groups-query.ts"
import { useAuth } from "@/features/auth/context/auth-context.tsx"
import { useNavigate } from "react-router-dom"
import { ConfirmDialog } from "@components/common/confirm-dialog.tsx"
import { useClearClassesByGroupId } from "@/features/classes-schedule/classes/hooks/use-class-query.ts"
import { CancelClassesDialog } from "@components/GroupSettings/CancelClassesDialog.tsx"
import { RestoreClassesDialog } from "@components/GroupSettings/RestoreClassesDialog.tsx"
import { MessageCircle, Trash2, Ban, ArrowUp, Import, ListChecks } from "lucide-react"
import Eraser from "@assets/eraser.svg?react"
import { useDeleteGroup } from "@/features/classes-schedule/groups/hooks/use-delete-group.ts"
import { useCancelClassesByGroupId } from "@/features/classes-schedule/classes/hooks/use-cancel-class.ts"
import { useQueryClient } from "@tanstack/react-query"
import { groupsKey } from "@/utils/query-keys.ts"

export const GroupSettingsPage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [isEditingGroup, setIsEditingGroup] = useState(false)
  const [isChoosingGroup, setIsChoosingGroup] = useState(false)
  const [needsToRefreshGroupListDisplay, setNeedsToRefreshGroupListDisplay] = useState(false)

  const [clearAllDialogOpen, setClearAllDialogOpen] = useState(false)
  const [cancelAllForGroupDialogOpen, setCancelAllForGroupDialogOpen] = useState(false)
  const [promoteAllGroupsDialogOpen, setPromoteAllGroupsDialogOpen] = useState(false)
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false)

  const { authState } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: group, isLoading: isGroupLoading } = useGetGroupById({ id: selectedGroupId! })
  const {
    data: groups,
    isLoading: isGroupsLoading,
    isSuccess: isGroupsSuccess,
    isFetching: isGroupsFetching,
  } = useGetGroups({ grade: null })
  const { mutateAsync: clearClassesByGroupId } = useClearClassesByGroupId({
    groupId: selectedGroupId!,
  })
  const { mutateAsync: promoteAllGroups } = usePromoteGroups()
  const { mutateAsync: cancelAllClassesByGroupId } = useCancelClassesByGroupId({
    groupId: selectedGroupId!,
  })
  const { mutateAsync: deleteGroup } = useDeleteGroup(
    { id: selectedGroupId! },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries({ queryKey: [groupsKey, { grade: null }], exact: true })
        setNeedsToRefreshGroupListDisplay(true)
      },
    }
  )

  useEffect(() => {
    if (needsToRefreshGroupListDisplay && isGroupsSuccess && !isGroupsFetching) {
      setIsEditingGroup(false)
      setIsChoosingGroup(true)
      setSelectedGroupId(null)
      setNeedsToRefreshGroupListDisplay(false)
    }
  }, [needsToRefreshGroupListDisplay, groups, isGroupsSuccess, isGroupsFetching, queryClient])

  useEffect(() => {
    if (isChoosingGroup || !isEditingGroup) {
      document.title = "Управление группами"
    } else if (group?.name) {
      document.title = `Редактирование группы ${group.name}`
    }
  }, [isEditingGroup, isChoosingGroup, group?.name])

  const filteredGroups =
    authState.userData?.role === "Admin"
      ? groups?.data
      : groups?.data.filter(grp => authState.userData!.managed_group_ids!.includes(grp.id))

  const handleGroupClick = (groupId: string) => {
    setSelectedGroupId(groupId)
    setIsEditingGroup(true)
  }

  const breadcrumbLevels = [
    { title: "Управление", onClick: () => navigate("/settings") },
    {
      title: "Управление группами",
      onClick: () => {
        setIsEditingGroup(false)
        setSelectedGroupId(null)
        setIsChoosingGroup(false)
      },
    },
    {
      title: "Список групп",
      onClick: () => {
        setIsEditingGroup(false)
        setSelectedGroupId(null)
        setIsChoosingGroup(true)
      },
    },
    { title: isGroupLoading ? "Группа" : (group?.name ?? "") },
  ]

  if (isEditingGroup) {
    return (
      <div className="mx-8 flex flex-col items-start gap-4">
        <div className="flex flex-col gap-2">
          <Breadcrumbs levels={breadcrumbLevels} visibleCount={4} />

          <p className="font-raleway mb-1 text-xl/6 font-medium">
            Управление группой {isGroupLoading ? "..." : group!.name}
          </p>

          <div className="flex flex-row flex-wrap gap-2">
            <Button>
              <Import className="mr-2 h-4 w-4" />
              Импортировать расписание с оф. сайта
            </Button>
            <Button>
              <MessageCircle className="mr-2 h-4 w-4" />
              Привязать бота к беседе в мессенджере
            </Button>

            <RestoreClassesDialog groupId={selectedGroupId!} />
          </div>

          <div className="flex flex-row flex-wrap gap-2">
            <Button variant="destructive" onClick={() => setClearAllDialogOpen(true)}>
              <Eraser className="mr-2 h-4 w-4" />
              Очистить расписание
            </Button>
            <ConfirmDialog
              open={clearAllDialogOpen}
              onOpenChange={setClearAllDialogOpen}
              onConfirm={clearClassesByGroupId}
              title="Очистить расписание"
              description={`Вы уверены, что хотите очистить расписание для группы ${
                isGroupLoading ? "..." : group!.name
              }? Это действие нельзя будет отменить.`}
            />

            <Button variant="destructive" onClick={() => setCancelAllForGroupDialogOpen(true)}>
              <Ban className="mr-2 h-4 w-4" />
              Отменить все пары
            </Button>
            <ConfirmDialog
              open={cancelAllForGroupDialogOpen}
              onOpenChange={setCancelAllForGroupDialogOpen}
              onConfirm={cancelAllClassesByGroupId}
              title="Отменить все пары"
              description={`Вы уверены, что хотите отменить все пары для группы ${
                isGroupLoading ? "..." : group!.name
              }?`}
            />

            <CancelClassesDialog mode="group" weeks={group?.weeks} groupId={selectedGroupId!} />
            <Button variant="destructive" onClick={() => setDeleteGroupDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Удалить группу
            </Button>
            <ConfirmDialog
              open={deleteGroupDialogOpen}
              onOpenChange={setDeleteGroupDialogOpen}
              onConfirm={deleteGroup}
              title="Удалить группу"
              description={`Вы уверены, что хотите удалить группу ${isGroupLoading ? "..." : group!.name}? Это действие нельзя будет отменить.`}
            />
          </div>
        </div>
      </div>
    )
  }

  if (isChoosingGroup) {
    return (
      <div className="mx-8 flex flex-col items-start gap-4">
        <div className="flex flex-col gap-2">
          <Breadcrumbs levels={breadcrumbLevels} visibleCount={3} />

          <p className="font-raleway mb-1 text-xl/6 font-medium">Выберите группу для управления</p>
          <GroupsList
            groups={filteredGroups}
            loading={isGroupsLoading}
            onGroupClick={handleGroupClick}
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mx-8 flex flex-col items-start gap-4">
        <div className="flex flex-col gap-2">
          <Breadcrumbs levels={breadcrumbLevels} visibleCount={2} />

          <p className="font-raleway mb-1 text-xl/6 font-medium">Общие параметры групп</p>

          <div className="flex flex-row flex-wrap gap-2">
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  setIsChoosingGroup(true)
                }}>
                <ListChecks className="mr-2 h-4 w-4" />
                Выбрать группу для редактирования
              </Button>
              <div className="flex flex-row flex-wrap gap-2">
                <Button variant="destructive" onClick={() => setPromoteAllGroupsDialogOpen(true)}>
                  <ArrowUp className="mr-2 h-4 w-4" />
                  Перевести все группы на следующий курс
                </Button>
                <ConfirmDialog
                  open={promoteAllGroupsDialogOpen}
                  onOpenChange={setPromoteAllGroupsDialogOpen}
                  onConfirm={promoteAllGroups}
                  title="Перевести все группы на следующий курс"
                  description="Вы уверены, что хотите продолжить? Все существующие группы будут переведены в следующий курс, а группы четвертого курса будут архивированы. Это действие нельзя будет отменить."
                />

                <CancelClassesDialog mode="global" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
