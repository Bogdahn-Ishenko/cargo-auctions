import { useNavigate, useSearch } from "@tanstack/react-router"
import { useAuctionsList } from "@/entities/Auction/api/UseAuctionsList"
import type { AuctionListRequest } from "@/entities/Auction/model/AuctionList.types"
import { AuctionListRow } from "./AuctionListRow"
import { AuctionsListEmptyState } from "./AuctionsListEmptyState"
import { AuctionsListErrorState } from "./AuctionsListErrorState"
import { AuctionsListFilters } from "./AuctionsListFilters"
import { AuctionsListPagination } from "./AuctionsListPagination"
import { AuctionsListSkeleton } from "./AuctionsListSkeleton"

export function AuctionsListPage() {
  const search = useSearch({ from: "/" })
  const navigate = useNavigate({ from: "/" })
  const request: AuctionListRequest = {
    page: search.page,
    per_page: search.per_page,
    ...(search.cargo_num ? { cargo_num: search.cargo_num } : {}),
    ...(search.is_available === undefined ? {} : { is_available: search.is_available }),
  }
  const auctionsQuery = useAuctionsList(request)

  function updatePage(page: number) {
    void navigate({
      search: (previous) => ({
        ...previous,
        page,
      }),
    })
  }

  function updateFilters(filters: { cargoNum: string; isAvailable?: boolean }) {
    void navigate({
      search: (previous) => ({
        ...previous,
        page: 1,
        cargo_num: filters.cargoNum || undefined,
        is_available: filters.isAvailable,
      }),
    })
  }

  function resetFilters() {
    void navigate({
      search: () => ({
        page: 1,
        per_page: search.per_page,
        cargo_num: undefined,
        is_available: undefined,
      }),
    })
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <header className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold">Аукционы</h1>
          <p className="text-sm text-muted-foreground">Базовый список заявок из API.</p>
        </header>

        <AuctionsListFilters
          cargoNum={search.cargo_num ?? ""}
          isAvailable={search.is_available}
          onApply={updateFilters}
          onReset={resetFilters}
        />

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
            <AuctionsListPagination meta={auctionsQuery.data.meta} onPageChange={updatePage} />
          </div>
        ) : null}
      </section>
    </main>
  )
}
