import { FC } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/basic/dialog.tsx"
import { Button, ButtonVariant } from "@/ui/basic/button.tsx"
import { Check, X } from "lucide-react"

export interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title: string
  description: string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonVariant?: ButtonVariant
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmButtonText = "Подтвердить",
  cancelButtonText = "Отмена",
  confirmButtonVariant = "destructive",
}) => {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant={confirmButtonVariant}
            onClick={handleConfirm}
            className="w-1/2">
            <Check className="mr-2 h-4 w-4" />
            {confirmButtonText}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-1/2">
            <X className="mr-2 h-4 w-4" />
            {cancelButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
