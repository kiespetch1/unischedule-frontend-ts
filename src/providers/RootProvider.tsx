import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FC, PropsWithChildren } from "react"
import { ToasterProvider } from "@/providers/ToasterProvider.tsx"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"
import { DialogProvider } from "@/contexts/dialog-context.tsx"

const queryClient = new QueryClient()

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <TooltipProvider>
        <DialogProvider>
          <ToasterProvider />
          {children}
        </DialogProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
