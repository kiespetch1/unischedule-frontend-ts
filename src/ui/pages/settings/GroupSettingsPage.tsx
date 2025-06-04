import { useEffect, useState } from "react"
import { useGetGroupById } from "@/features/classes-schedule/groups/hooks/use-group-query.ts"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/basic/breadcrumb.tsx"
import { Button } from "@/ui/basic/button.tsx"
import { GroupsList } from "@components/GroupsList/GroupsList.tsx"
import {
  useGetGroups,
  usePromoteGroups,
} from "@/features/classes-schedule/groups/hooks/use-groups-query.ts"
import { useAuth } from "@/features/auth/context/auth-context.tsx"
import { useNavigate } from "react-router-dom"
import { ConfirmDialog } from "@components/common/confirm-dialog.tsx"
import { DialogWrapper } from "@components/common/DialogWrapper.tsx"
import {
  useCancelClassesByDays,
  useClearClassesByGroupId,
} from "@/features/classes-schedule/classes/hooks/use-class-query.ts"
import { useCancelAllClassesByDaysName } from "@/features/classes-schedule/groups/hooks/use-cancel-all-classes-by-days-name"
import { DaysSelector, GlobalDaysResult } from "@components/GroupSettings/DaysSelector.tsx"
import {
  MessageCircle,
  Trash2,
  Ban,
  CalendarX,
  ArrowLeft,
  ArrowUp,
  Import,
  CalendarMinus,
  ListChecks
} from "lucide-react"

export const GroupSettingsPage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [isEditingGroup, setIsEditingGroup] = useState(false)
  const [isChoosingGroup, setIsChoosingGroup] = useState(false)

  const [idList, setIdList] = useState<string[]>([])
  const [globalDays, setGlobalDays] = useState<GlobalDaysResult>({ even: [], odd: [] })

  const [clearAllDialogOpen, setClearAllDialogOpen] = useState(false)
  const [cancelAllForGroupDialogOpen, setCancelAllForGroupDialogOpen] = useState(false)
  const [cancelMultipleDialogOpen, setCancelMultipleDialogOpen] = useState(false)
  const [promoteAllGroupsDialogOpen, setPromoteAllGroupsDialogOpen] = useState(false)
  const [cancelAllGroupsDialogOpen, setCancelAllGroupsDialogOpen] = useState(false)

  const { authState } = useAuth()
  const navigate = useNavigate()
  const { data: group, isLoading: isGroupLoading } = useGetGroupById({ id: selectedGroupId! })
  const { data: groups, isLoading: isGroupsLoading } = useGetGroups({ grade: null })
  const { mutateAsync: clearClassesByGroupId } = useClearClassesByGroupId({
    groupId: selectedGroupId!,
  })
  const { mutateAsync: promoteAllGroups } = usePromoteGroups()
  const { mutateAsync: cancelClassesByDayId } = useCancelClassesByDays({
    groupId: selectedGroupId!,
    dayIds: idList,
  })
  const { mutateAsync: cancelAllByDaysName } = useCancelAllClassesByDaysName(globalDays)

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
      : groups?.data.filter(group => authState.userData!.managed_group_ids!.includes(group.id))

  const handleGroupClick = (groupId: string) => {
    setSelectedGroupId(groupId)
    setIsEditingGroup(true)
  }

  if (isEditingGroup) {
    return (
      <div className="mx-8 flex flex-col items-start gap-4">
        <div className="flex flex-col gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate("/settings")}>Управление</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => {
                    setIsEditingGroup(false)
                    setSelectedGroupId(null)
                    setIsChoosingGroup(false)
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
                    setIsChoosingGroup(true)
                  }}>
                  Список групп
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{isGroupLoading ? "Группа" : group!.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <Button variant="destructive" onClick={() => setClearAllDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Очистить расписание
            </Button>
            <ConfirmDialog
              open={clearAllDialogOpen}
              onOpenChange={setClearAllDialogOpen}
              onConfirm={clearClassesByGroupId}
              title="Очистить расписание"
              description={`Вы уверены, что хотите очистить расписание для группы ${isGroupLoading ? "..." : group!.name}? Это действие нельзя будет отменить.`}
            />

            <Button variant="destructive" onClick={() => setCancelAllForGroupDialogOpen(true)}>
              <Ban className="mr-2 h-4 w-4" />
              Отменить все пары
            </Button>
            <ConfirmDialog
              open={cancelAllForGroupDialogOpen}
              onOpenChange={setCancelAllForGroupDialogOpen}
              onConfirm={clearClassesByGroupId}
              title="Отменить все пары"
              description={`Вы уверены, что хотите отменить все пары для группы ${isGroupLoading ? "..." : group!.name}?`}
            />

            <DialogWrapper
              open={cancelMultipleDialogOpen}
              onOpenChange={setCancelMultipleDialogOpen}
              showCloseButton={false}
              trigger={
                <Button variant="destructive">
                  <CalendarX className="mr-2 h-4 w-4" />
                  Отменить пары для указанных дней
                </Button>
              }>
              <div className="flex flex-col gap-2">
                <div className="font-raleway text-base/6 font-semibold">
                  Отменить пары для указанных дней
                </div>
                <div className="font-raleway text-muted-foreground text-sm font-normal">
                  Выберите дни для отмены
                </div>
                <div className="flex flex-col max-h-[calc(80vh-100px)]">
                  <DaysSelector mode="group" weeks={group?.weeks} onGroupChange={setIdList} />
                  <div className="flex flex-row items-center justify-end gap-2 mt-4 pt-2">
                    <Button onClick={() => setCancelMultipleDialogOpen(false)}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Вернуться
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={idList.length === 0}
                      onClick={async () => {
                        await cancelClassesByDayId()
                        setCancelMultipleDialogOpen(false)
                      }}>
                      <CalendarMinus className="mr-2 h-4 w-4" />
                      Отменить выбранные пары
                    </Button>
                  </div>
                </div>
              </div>
            </DialogWrapper>
          </div>
        </div>
      </div>
    )
  }

  if (isChoosingGroup) {
    return (
      <div className="mx-8 flex flex-col items-start gap-4">
        <div className="flex flex-col gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate("/settings")}>Управление</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => {
                    setIsEditingGroup(false)
                    setSelectedGroupId(null)
                    setIsChoosingGroup(false)
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate("/settings")}>Управление</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Управление группами</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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

                <DialogWrapper
                  open={cancelAllGroupsDialogOpen}
                  onOpenChange={setCancelAllGroupsDialogOpen}
                  showCloseButton={false}
                  trigger={
                    <Button
                      variant="destructive"
                      onClick={() => setCancelAllGroupsDialogOpen(true)}>
                      <CalendarX className="mr-2 h-4 w-4" />
                      Отменить пары для всех групп на указанный период
                    </Button>
                  }>
                  <div className="mr-2 flex flex-col gap-2">
                    <p className="font-raleway text-lg font-semibold leading-none">
                      Отменить пары для всех групп на указанный период
                    </p>
                    <p className="font-raleway text-muted-foreground text-sm">
                      Выберите период, в течение которого будут отменены пары для всех групп.
                    </p>
                  </div>
                  <div className="flex flex-col max-h-[calc(80vh-100px)] mt-2">
                    <DaysSelector mode="global" onGlobalChange={setGlobalDays} />
                    <div className="flex flex-row items-center justify-end gap-2 mt-4 pt-2">
                      <Button onClick={() => setCancelAllGroupsDialogOpen(false)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Вернуться
                      </Button>
                      <Button
                        variant="destructive"
                        disabled={globalDays.even.length === 0 && globalDays.odd.length === 0}
                        onClick={async () => {
                          await cancelAllByDaysName()
                          setCancelAllGroupsDialogOpen(false)
                        }}>
                        <CalendarMinus className="mr-2 h-4 w-4" />
                        Отменить выбранные пары
                      </Button>
                    </div>
                  </div>
                </DialogWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
