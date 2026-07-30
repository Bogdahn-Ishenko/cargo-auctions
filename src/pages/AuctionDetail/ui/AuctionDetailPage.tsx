import { Link, useParams } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { useAuctionDetail } from "@/entities/Auction/api/UseAuctionDetail"
import { AuctionDetailErrorState } from "./AuctionDetailErrorState"
import { AuctionDetailHeader } from "./AuctionDetailHeader"
import { AuctionDetailPriceCard } from "./AuctionDetailPriceCard"
import { AuctionDetailRouteCard } from "./AuctionDetailRouteCard"
import { AuctionDetailSkeleton } from "./AuctionDetailSkeleton"

export function AuctionDetailPage() {
  const { auctionUuid } = useParams({ from: "/auctions/$auctionUuid" })
  const detailQuery = useAuctionDetail(auctionUuid)

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <Button asChild variant="ghost" className="w-fit">
          <Link to="/" search={{ page: 1, per_page: 20 }}>
            Назад к списку
          </Link>
        </Button>

        {detailQuery.isLoading ? <AuctionDetailSkeleton /> : null}

        {detailQuery.isError ? (
          <AuctionDetailErrorState onRetry={() => void detailQuery.refetch()} />
        ) : null}

        {detailQuery.data ? (
          <>
            <AuctionDetailHeader auction={detailQuery.data} />
            <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
              <AuctionDetailRouteCard routes={detailQuery.data.routes} />
              <AuctionDetailPriceCard auction={detailQuery.data} />
            </div>
          </>
        ) : null}
      </section>
    </main>
  )
}
