import { TooltipWrapper } from "@components/common/TooltipWrapper.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Check, Trash } from "lucide-react"
import { FC } from "react"

export interface ClassSideButtonsProps {
  onClassDelete: () => void
}

export const ClassSideButtons: FC<ClassSideButtonsProps> = ({ onClassDelete }) => {
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
          onClick={onClassDelete}>
          <Trash color="red" />
        </Button>
      </TooltipWrapper>
    </>
  )
}
