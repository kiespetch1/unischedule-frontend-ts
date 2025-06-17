import { FC, useState, ChangeEvent } from "react"
import {
  useLmsData,
  useCreateLmsData,
  useUpdateLmsData,
  useDeleteLmsData,
} from "@/features/classes-schedule/lms/hooks/use-lms-data"
import { LmsData } from "@/features/classes-schedule/types/classes-types"
import { Pencil, Trash2, Plus, Copy } from "lucide-react"
import { Input } from "@/ui/basic/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/basic/dialog"
import { Button } from "@/ui/basic/button"
import { ScrollArea } from "@/ui/basic/scroll-area"

interface LmsDataDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groupId: string
}

export const LmsDataDialog: FC<LmsDataDialogProps> = ({ open, onOpenChange, groupId }) => {
  const { data: lmsDataResponse, isLoading } = useLmsData(groupId)
  const createLmsData = useCreateLmsData()
  const updateLmsData = useUpdateLmsData()
  const deleteLmsData = useDeleteLmsData()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [subject, setSubject] = useState("")
  const [data, setData] = useState("")

  const handleEdit = (item: LmsData) => {
    setEditingId(item.id)
    setSubject(item.subject)
    setData(item.data)
  }

  const handleSave = () => {
    if (editingId) {
      updateLmsData.mutate(
        { id: editingId, data: { subject, data, group_id: groupId } },
        {
          onSuccess: () => {
            setEditingId(null)
            setIsCreating(false)
            setSubject("")
            setData("")
          },
        }
      )
    } else {
      createLmsData.mutate(
        { subject, data, group_id: groupId },
        {
          onSuccess: () => {
            setEditingId(null)
            setIsCreating(false)
            setSubject("")
            setData("")
          },
        }
      )
    }
  }

  const handleDelete = (id: string) => {
    deleteLmsData.mutate(id)
  }

  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value)
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsCreating(false)
    setSubject("")
    setData("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Текущие курсы в LMS</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1">
          {isLoading ? (
            <div>Загрузка...</div>
          ) : (
            <>
              <ScrollArea className="h-[400px] pr-4">
                {lmsDataResponse?.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-raleway pt-5 text-sm text-gray-500">
                      Здесь пока ничего нет...
                    </span>
                  </div>
                ) : (
                  lmsDataResponse?.map(item => (
                    <div
                      key={item.id}
                      className="mb-2 flex items-center justify-between gap-2 rounded-lg border p-4">
                      {editingId === item.id ? (
                        <>
                          <Input
                            value={subject}
                            onChange={handleSubjectChange}
                            placeholder="Название пары"
                          />
                          <Input value={data} onChange={handleDataChange} placeholder="Код курса" />
                          <Button onClick={handleSave}>Сохранить</Button>
                          <Button variant="outline" onClick={handleCancel}>
                            Отмена
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-1 items-center gap-4">
                            <div className="font-raleway text-sm text-gray-500">{item.subject}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="font-raleway text-base font-semibold">{item.data}</div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => navigator.clipboard.writeText(item.data)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </ScrollArea>
              {!editingId && !isCreating && (
                <Button
                  onClick={() => setIsCreating(true)}
                  className="mt-2 w-full"
                  variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить курс
                </Button>
              )}
              {isCreating && (
                <div className="mt-2 flex items-center gap-2">
                  <Input
                    value={subject}
                    onChange={handleSubjectChange}
                    placeholder="Название пары"
                  />
                  <Input value={data} onChange={handleDataChange} placeholder="Код курса" />
                  <Button onClick={handleSave}>Добавить</Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Отмена
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
