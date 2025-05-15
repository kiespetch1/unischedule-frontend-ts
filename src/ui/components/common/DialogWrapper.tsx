import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog"
import { FC, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export interface DialogWrapperProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  headless?: boolean
  title?: ReactNode
  description?: ReactNode
  trigger: ReactNode
  children?: ReactNode
  className?: string
  showCloseButton?: boolean
}

export const DialogWrapper: FC<DialogWrapperProps> = ({
  open,
  onOpenChange,
  defaultOpen,
  headless = false,
  title,
  description,
  trigger,
  children,
  className,
  showCloseButton = true,
}) => (
  <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogPortal>
      <DialogOverlay />
      <DialogContent
        className={cn(
          "z-60 fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl",
          headless ? "bg-transparent p-0 shadow-none" : "bg-white p-6 shadow-lg",
          className
        )}>
        {!headless && (title || description) && (
          <DialogHeader className="mb-4">
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {headless && (
          <>
            <VisuallyHidden asChild>
              <DialogTitle>{title}</DialogTitle>
            </VisuallyHidden>
            <VisuallyHidden asChild>
              <DialogDescription>{description}</DialogDescription>
            </VisuallyHidden>
          </>
        )}

        <div className="relative">
          {children}
          {showCloseButton && (
            <DialogClose className="absolute right-4 top-4 opacity-50 hover:opacity-100">
              ✕
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </DialogPortal>
  </Dialog>
)
