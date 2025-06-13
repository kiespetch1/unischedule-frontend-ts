import { TooltipWrapper } from "@components/common/TooltipWrapper.tsx"
import { Button } from "@/ui/basic/button.tsx"
import { Check, Trash } from "lucide-react"
import { FC, useState } from "react"
import { ConfirmDialog } from "../../common/confirm-dialog"

export interface ClassSideButtonsProps {
  onClassDelete: () => void
}

export const ClassSideButtons: FC<ClassSideButtonsProps> = ({ onClassDelete }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <TooltipWrapper message="Сохранить изменения">
        <Button
          type="submit"
          variant="block"
          size="thin"
          className="absolute left-[606px] top-0 h-[63px] w-[60px] flex-col">
          <Check />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper message="Удалить пару">
        <Button
          type="button"
          variant="block"
          size="thin"
          className="absolute left-[606px] top-[69px] h-[63px] w-[60px] flex-col"
          onClick={() => setOpen(true)}>
          <Trash color="red" />
        </Button>
      </TooltipWrapper>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={onClassDelete}
        title="Удаление пары"
        description="Вы уверены, что хотите удалить пару? Это действие невозможно будет отменить."
        confirmButtonText="Удалить"
        confirmButtonVariant="destructive"
      />
    </>
  )
}
