import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { JSX, ReactNode } from "react"
import { TooltipProps } from "@radix-ui/react-tooltip"

interface TooltipWrapperProps extends TooltipProps {
  message: ReactNode
  children: ReactNode
}

/**
 * Компонент для добавления всплывающей подсказки при наведении на оборачиваемый элемент:
 * `<TooltipWrapper message="Я подсказка!"><button>Наведи</button></TooltipWrapper>`
 */
export function TooltipWrapper({ message, children, ...tooltipProps }: TooltipWrapperProps) {
  return (
    <Tooltip {...tooltipProps}>
      <TooltipTrigger asChild>{children as JSX.Element}</TooltipTrigger>
      <TooltipContent>{message}</TooltipContent>
    </Tooltip>
  )
}
