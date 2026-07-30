import { useNavigate, useSearch } from "@tanstack/react-router"
import { useAuctionsList } from "@/entities/Auction/api/UseAuctionsList"
import type { AuctionListRequest } from "@/entities/Auction/model/AuctionList.types"
import { AuctionListRow } from "./AuctionListRow"
import { AuctionsListEmptyState } from "./AuctionsListEmptyState"
import { AuctionsListErrorState } from "./AuctionsListErrorState"
import { AuctionsListFilters } from "./AuctionsListFilters"
import { AuctionsListPagination } from "./AuctionsListPagination"
import { AuctionsListSkeleton } from "./AuctionsListSkeleton"
import { AuctionsListToolbar } from "./AuctionsListToolbar"
import type {
  AuctionsListSort,
  AuctionsListTradingStatusSearch,
  AuctionsListTypeSearch,
} from "../model/AuctionsListSearch.schema"

export function AuctionsListPage() {
  const search = useSearch({ from: "/" })
  const navigate = useNavigate({ from: "/" })
  const request: AuctionListRequest = {
    page: search.page,
    per_page: search.per_page,
    sort: getApiSort(search.sort),
    ...(search.auc_type === "all" ? {} : { auc_type: [search.auc_type] }),
    ...(search.status === "all" ? {} : { status: [search.status] }),
    ...(search.cargo_num ? { cargo_num: search.cargo_num } : {}),
    ...(search.price_per_km_from ? { price_per_km_from: search.price_per_km_from } : {}),
    ...(search.price_per_km_to ? { price_per_km_to: search.price_per_km_to } : {}),
    ...(search.weight_from ? { weight_from: search.weight_from } : {}),
    ...(search.weight_to ? { weight_to: search.weight_to } : {}),
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

  function updatePageSize(perPage: number) {
    void navigate({
      search: (previous) => ({
        ...previous,
        page: 1,
        per_page: perPage,
      }),
    })
  }

  function updateFilters(filters: {
    auctionType: AuctionsListTypeSearch
    cargoNum: string
    isAvailable?: boolean
    pricePerKmFrom: string
    pricePerKmTo: string
    tradingStatus: AuctionsListTradingStatusSearch
    weightFrom: string
    weightTo: string
  }) {
    const weightFrom = Number(filters.weightFrom)
    const weightTo = Number(filters.weightTo)
    const pricePerKmFrom = Number(filters.pricePerKmFrom)
    const pricePerKmTo = Number(filters.pricePerKmTo)

    void navigate({
      search: (previous) => ({
        ...previous,
        page: 1,
        auc_type: filters.auctionType,
        cargo_num: filters.cargoNum || undefined,
        is_available: filters.isAvailable,
        price_per_km_from: Number.isFinite(pricePerKmFrom) && pricePerKmFrom > 0 ? pricePerKmFrom : undefined,
        price_per_km_to: Number.isFinite(pricePerKmTo) && pricePerKmTo > 0 ? pricePerKmTo : undefined,
        status: filters.tradingStatus,
        weight_from: Number.isFinite(weightFrom) && weightFrom > 0 ? weightFrom : undefined,
        weight_to: Number.isFinite(weightTo) && weightTo > 0 ? weightTo : undefined,
      }),
    })
  }

  function resetFilters() {
    void navigate({
      search: () => ({
        page: 1,
        per_page: search.per_page,
        sort: search.sort,
        auc_type: "all",
        cargo_num: undefined,
        is_available: undefined,
        price_per_km_from: undefined,
        price_per_km_to: undefined,
        status: "all",
        weight_from: undefined,
        weight_to: undefined,
      }),
    })
  }

  function updateSort(sort: AuctionsListSort) {
    void navigate({
      search: (previous) => ({
        ...previous,
        page: 1,
        sort,
      }),
    })
  }

  return (
    <main className="flex min-h-screen bg-slate-950 text-slate-100">
      <section className="flex min-h-screen w-full flex-col lg:flex-row">
        <AuctionsListFilters
          auctionType={search.auc_type}
          cargoNum={search.cargo_num ?? ""}
          isAvailable={search.is_available}
          onApply={updateFilters}
          onReset={resetFilters}
          pricePerKmFrom={search.price_per_km_from ? String(search.price_per_km_from) : ""}
          pricePerKmTo={search.price_per_km_to ? String(search.price_per_km_to) : ""}
          tradingStatus={search.status}
          weightFrom={search.weight_from ? String(search.weight_from) : ""}
          weightTo={search.weight_to ? String(search.weight_to) : ""}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <AuctionsListToolbar
            from={auctionsQuery.data?.meta.from}
            onSortChange={updateSort}
            sort={search.sort}
            to={auctionsQuery.data?.meta.to}
            total={auctionsQuery.data?.meta.total}
          />

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
            <AuctionsListPagination
              meta={auctionsQuery.data.meta}
              onPageChange={updatePage}
              onPageSizeChange={updatePageSize}
            />
          ) : null}
        </div>
      </section>
    </main>
  )
}

function getApiSort(sort: AuctionsListSort): AuctionListRequest["sort"] {
  const sortMap: Record<AuctionsListSort, NonNullable<AuctionListRequest["sort"]>> = {
    stop_time_asc: { "trading.stop_time": "asc" },
    price_asc: { "trading.price.current": "asc" },
    price_desc: { "trading.price.current": "desc" },
    load_date_asc: { "route.load.date": "asc" },
  }

  return sortMap[sort]
}
