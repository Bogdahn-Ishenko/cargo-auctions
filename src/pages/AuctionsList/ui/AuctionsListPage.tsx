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
    <main className="flex min-h-screen bg-slate-950 text-slate-100">
      <section className="flex min-h-screen w-full flex-col lg:flex-row">
        <AuctionsListFilters
          cargoNum={search.cargo_num ?? ""}
          isAvailable={search.is_available}
          onApply={updateFilters}
          onReset={resetFilters}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/60 px-5 py-4">
            <div>
              <h1 className="font-heading text-[15px] font-bold leading-tight text-slate-100">
                Список аукционов
              </h1>
              <p className="mt-0.5 text-[11px] text-slate-500">
                {auctionsQuery.data
                  ? `Показано ${auctionsQuery.data.meta.from}-${auctionsQuery.data.meta.to} из ${auctionsQuery.data.meta.total}`
                  : "Загрузка результатов"}
              </p>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-5">
            {auctionsQuery.isLoading ? <AuctionsListSkeleton /> : null}

            {auctionsQuery.isError ? (
              <AuctionsListErrorState onRetry={() => void auctionsQuery.refetch()} />
            ) : null}

            {auctionsQuery.data?.data.length === 0 ? (
              <AuctionsListEmptyState />
            ) : null}

            {auctionsQuery.data?.data.length ? (
              <div className="grid max-w-[1100px] gap-4 xl:grid-cols-2">
                {auctionsQuery.data.data.map((auction) => (
                  <AuctionListRow key={auction.main.order_uid} auction={auction} />
                ))}
              </div>
            ) : null}
          </div>

          {auctionsQuery.data ? (
            <AuctionsListPagination meta={auctionsQuery.data.meta} onPageChange={updatePage} />
          ) : null}
        </div>
      </section>
    </main>
  )
}
