import { FC, useState } from "react"
import { DialogWrapper } from "@components/common/DialogWrapper.tsx"
import { Button } from "@/ui/basic/button.tsx"
import { Card } from "@/ui/basic/card.tsx"
import { Check, ArrowLeft, Undo2 } from "lucide-react"
import clsx from "clsx"
import { ClassModel } from "@/features/classes-schedule/types/classes-types.ts"
import { useRestoreClassesByIds } from "@/features/classes-schedule/classes/hooks/use-class-query.ts"

interface RestoreCancelledDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cancelledClasses: ClassModel[]
  groupId: string
}

export const RestoreCancelledDialog: FC<RestoreCancelledDialogProps> = ({
  open,
  onOpenChange,
  cancelledClasses,
  groupId,
}) => {
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const { mutateAsync: restoreClasses } = useRestoreClassesByIds({ classIds: selected, groupId })

  const toggleSelect = (id: string) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
  }

  const handleRestore = async () => {
    setLoading(true)
    await restoreClasses()
    setLoading(false)
    setSelected([])
    onOpenChange(false)
  }

  return (
    <DialogWrapper open={open} onOpenChange={onOpenChange} showCloseButton={false} trigger={null}>
      <div className="flex flex-col gap-2">
        <div className="font-raleway text-base/6 font-semibold">Восстановить отменённые пары</div>
        <div className="font-raleway text-muted-foreground text-sm font-normal">
          Выберите отменённые пары для восстановления
        </div>
        <div className="flex max-h-[calc(80vh-100px)] flex-col gap-2 overflow-auto">
          {cancelledClasses.length === 0 ? (
            <div className="font-raleway text-muted-foreground text-center">Нет отменённых пар</div>
          ) : (
            cancelledClasses.map(item => (
              <Card
                key={item.id}
                className={clsx(
                  "flex w-full cursor-pointer flex-row items-center justify-between border px-3 py-2",
                  selected.includes(item.id) && "border-blue-500 bg-blue-50"
                )}
                onClick={() => toggleSelect(item.id)}>
                <div className="flex flex-col">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {item.started_at} - {item.finished_at}
                  </span>
                </div>
                {selected.includes(item.id) && <Check className="h-5 w-5" color="#0966BB" />}
              </Card>
            ))
          )}
        </div>
        <div className="mt-4 flex flex-row items-center justify-end gap-2 pt-2">
          <Button onClick={() => onOpenChange(false)} disabled={loading}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться
          </Button>
          <Button
            variant="default"
            disabled={selected.length === 0 || loading}
            onClick={handleRestore}>
            <Undo2 className="mr-2 h-4 w-4" />
            Восстановить выбранные
          </Button>
        </div>
      </div>
    </DialogWrapper>
  )
}
