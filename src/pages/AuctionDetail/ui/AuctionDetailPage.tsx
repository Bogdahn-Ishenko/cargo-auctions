import { Link, useParams } from "@tanstack/react-router"
import { RiArrowLeftLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { useAuctionBets } from "@/entities/Auction/api/UseAuctionBets"
import { useAuctionDetail } from "@/entities/Auction/api/UseAuctionDetail"
import { AuctionBidsTable } from "./AuctionBidsTable"
import { AuctionDetailErrorState } from "./AuctionDetailErrorState"
import { AuctionDetailHeader } from "./AuctionDetailHeader"
import { AuctionDetailInfoTable } from "./AuctionDetailInfoTable"
import { AuctionDetailPriceCard } from "./AuctionDetailPriceCard"
import { AuctionDetailRouteCard } from "./AuctionDetailRouteCard"
import { AuctionDetailSkeleton } from "./AuctionDetailSkeleton"

export function AuctionDetailPage() {
  const { auctionUuid } = useParams({ from: "/auctions/$auctionUuid" })
  const detailQuery = useAuctionDetail(auctionUuid)
  const betsQuery = useAuctionBets(auctionUuid)

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900/60 px-5 py-3">
        <Button
          asChild
          className="text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          variant="ghost"
        >
          <Link to="/" search={{ page: 1, per_page: 6, sort: "stop_time_asc", auc_type: "all", status: "all" }}>
            <RiArrowLeftLine />
            Список аукционов
          </Link>
        </Button>
        {detailQuery.data ? (
          <>
            <span className="text-slate-700">/</span>
            <span className="font-mono text-sm font-semibold text-slate-300">
              {detailQuery.data.main.cargo_num}
            </span>
          </>
        ) : null}
      </div>

      <section className="flex-1 overflow-y-auto p-5">
        <div className="mx-auto grid max-w-[1180px] gap-4">
        {detailQuery.isLoading ? <AuctionDetailSkeleton /> : null}

        {detailQuery.isError ? (
          <AuctionDetailErrorState onRetry={() => void detailQuery.refetch()} />
        ) : null}

        {detailQuery.data ? (
          <>
            <AuctionDetailHeader auction={detailQuery.data} />
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="grid gap-4">
                <AuctionDetailRouteCard routes={detailQuery.data.routes} />
                <AuctionDetailInfoTable auction={detailQuery.data} />
                <AuctionBidsTable
                  bets={betsQuery.data?.bets ?? []}
                  isError={betsQuery.isError}
                  isLoading={betsQuery.isLoading}
                />
              </div>
              <AuctionDetailPriceCard auction={detailQuery.data} />
            </div>
          </>
        ) : null}
        </div>
      </section>
    </main>
  )
}
