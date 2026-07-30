import { useAuctionsList } from "@/entities/Auction/api/UseAuctionsList"
import { AuctionListRow } from "./AuctionListRow"
import { AuctionsListEmptyState } from "./AuctionsListEmptyState"
import { AuctionsListErrorState } from "./AuctionsListErrorState"
import { AuctionsListSkeleton } from "./AuctionsListSkeleton"

const initialRequest = {
  page: 1,
  per_page: 20,
}

export function AuctionsListPage() {
  const auctionsQuery = useAuctionsList(initialRequest)

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <header className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold">Аукционы</h1>
          <p className="text-sm text-muted-foreground">Базовый список заявок из API.</p>
        </header>

        {auctionsQuery.isLoading ? <AuctionsListSkeleton /> : null}

        {auctionsQuery.isError ? (
          <AuctionsListErrorState onRetry={() => void auctionsQuery.refetch()} />
        ) : null}

        {auctionsQuery.data?.data.length === 0 ? (
          <AuctionsListEmptyState />
        ) : null}

        {auctionsQuery.data?.data.length ? (
          <div className="grid gap-3">
            <div className="text-sm text-muted-foreground">
              Показано {auctionsQuery.data.meta.from}-{auctionsQuery.data.meta.to} из {auctionsQuery.data.meta.total}
            </div>
            {auctionsQuery.data.data.map((auction) => (
              <AuctionListRow key={auction.main.order_uid} auction={auction} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  )
}
