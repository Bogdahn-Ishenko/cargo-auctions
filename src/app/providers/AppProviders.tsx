import { QueryClientProvider } from "@tanstack/react-query"
import type { PropsWithChildren } from "react"
import { Toaster } from "@/components/ui/sonner"
import { queryClient } from "@/shared/api/QueryClient"
import { MswProvider } from "./MswProvider"

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <MswProvider>
        {children}
        <Toaster />
      </MswProvider>
    </QueryClientProvider>
  )
}
