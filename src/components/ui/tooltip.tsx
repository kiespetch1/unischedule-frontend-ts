import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

type ProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider> & {
  delayDuration?: number
  skipDelayDuration?: number
}

function TooltipProvider({ delayDuration = 500, skipDelayDuration, ...props }: ProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    />
  )
}

type RootProps = React.ComponentProps<typeof TooltipPrimitive.Root> & {
  delayDuration?: number
  skipDelayDuration?: number
}

function Tooltip({ delayDuration, skipDelayDuration, ...props }: RootProps) {
  return (
    <TooltipProvider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin) font-raleway z-100 w-fit text-balance rounded-md bg-zinc-500 px-3 py-1.5 text-xs",
          className
        )}
        {...props}>
        {children}
        <TooltipPrimitive.Arrow className="z-100 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-zinc-500 fill-zinc-500" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
