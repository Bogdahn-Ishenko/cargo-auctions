import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
import { AuctionDetailPage } from "@/pages/AuctionDetail"
import { AuctionDetailSearchSchema } from "@/pages/AuctionDetail/model/AuctionDetailSearch.schema"
import { AuctionsListPage } from "@/pages/AuctionsList"
import { AuctionsListSearchSchema } from "@/pages/AuctionsList/model/AuctionsListSearch.schema"

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: (search) => AuctionsListSearchSchema.parse(search),
  component: AuctionsListPage,
})

const auctionDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auctions/$auctionUuid",
  validateSearch: (search) => AuctionDetailSearchSchema.parse(search),
  component: AuctionDetailPage,
})

const routeTree = rootRoute.addChildren([indexRoute, auctionDetailRoute])

export const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
