import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FC, PropsWithChildren } from "react"
import { ToasterProvider } from "@/providers/ToasterProvider.tsx"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { TooltipProvider } from "@/ui/basic/tooltip.tsx"
import { DialogProvider } from "@/contexts/dialog-context.tsx"
import { AuthProvider } from "@/features/auth/context/auth-context"

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1 } } })

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <TooltipProvider>
          <DialogProvider>
            <ToasterProvider />
            {children}
          </DialogProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
