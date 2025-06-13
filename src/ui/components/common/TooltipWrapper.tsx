import { Tooltip, TooltipTrigger, TooltipContent } from "@/ui/basic/tooltip.tsx"
import React, { JSX, ReactNode } from "react"
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
 *
 * Для переноса строки используйте символ \n в message:
 * `<TooltipWrapper message="Первая строка\nВторая строка">`
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

  const formatMessage = (message: ReactNode): ReactNode => {
    if (typeof message === "string") {
      return message.split("\\n").map((line, index, array) => (
        <React.Fragment key={index}>
          {line}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))
    }
    return message
  }

  return (
    <Tooltip
      open={controlled ? isOpen : undefined}
      delayDuration={controlled ? 0 : undefined}
      onOpenChange={onOpenChange}
      {...tooltipProps}>
      <TooltipTrigger asChild>{children as JSX.Element}</TooltipTrigger>
      <TooltipContent>{formatMessage(message)}</TooltipContent>
    </Tooltip>
  )
}
