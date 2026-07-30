import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
import { AuctionsListPage } from "@/pages/AuctionsList"

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: AuctionsListPage,
})

const routeTree = rootRoute.addChildren([indexRoute])

export const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
