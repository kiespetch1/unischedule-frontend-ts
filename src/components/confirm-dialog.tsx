import { FC } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx"
import { Button, ButtonVariant } from "@/components/ui/button.tsx"

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
          <Button variant={confirmButtonVariant} onClick={handleConfirm} className="w-1/2">
            {confirmButtonText}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-1/2">
            {cancelButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
