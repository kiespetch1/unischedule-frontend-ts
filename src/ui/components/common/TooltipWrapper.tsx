import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip.tsx"
import { JSX, ReactNode } from "react"
import { TooltipProps } from "@radix-ui/react-tooltip"

interface TooltipWrapperProps extends Omit<TooltipProps, "open" | "onOpenChange"> {
  message: ReactNode
  children: ReactNode
  disabled?: boolean
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * Компонент для добавления всплывающей подсказки при наведении на оборачиваемый элемент:
 * `<TooltipWrapper message="Я подсказка!"><button>Наведи</button></TooltipWrapper>`
 */
export function TooltipWrapper({
  message,
  children,
  disabled = false,
  isOpen,
  onOpenChange,
  ...tooltipProps
}: TooltipWrapperProps) {
  if (disabled) {
    return <>{children}</>
  }

  const controlled = typeof isOpen === "boolean"

  return (
    <Tooltip
      open={controlled ? isOpen : undefined}
      delayDuration={controlled ? 0 : undefined}
      onOpenChange={onOpenChange}
      {...tooltipProps}>
      <TooltipTrigger asChild>{children as JSX.Element}</TooltipTrigger>
      <TooltipContent>{message}</TooltipContent>
    </Tooltip>
  )
}
