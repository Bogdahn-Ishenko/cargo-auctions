import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuctionsList } from "@/entities/Auction/api/UseAuctionsList";
import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types";
import { buildAuctionsListRequest } from "@/features/AuctionFilters/model/BuildAuctionsListRequest";
import { useAuctionsListUiStore } from "@/features/AuctionFilters/model/UseAuctionsListUiStore";
import { getToastErrorMessage } from "@/shared/lib/GetToastErrorMessage";
import { AuctionListRow, AuctionsListSkeleton } from "@/widgets/AuctionCard";
import {
  AuctionsListActiveFilters,
  AuctionsListFilters,
} from "@/widgets/FiltersPanel";
import { RouteMapPanel } from "@/widgets/RouteMap";
import { AuctionsListEmptyState } from "./AuctionsListEmptyState";
import { AuctionsListErrorState } from "./AuctionsListErrorState";
import { AuctionsListPagination } from "./AuctionsListPagination";
import { AuctionsListToolbar } from "./AuctionsListToolbar";
import type {
  AuctionsListSort,
  AuctionsListTradingStatusSearch,
  AuctionsListTypeSearch,
} from "@/features/AuctionFilters/model/AuctionsListSearch.schema";

export function AuctionsListPage() {
  const search = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });
  const request = buildAuctionsListRequest(search);
  const auctionsQuery = useAuctionsList(request);
  const [routePreviewAuction, setRoutePreviewAuction] =
    useState<AuctionListItem | null>(null);
  const { closeFilters, isFiltersOpen, toggleFilters } =
    useAuctionsListUiStore();

  useEffect(() => {
    if (!auctionsQuery.isError) return;

    toast.error(
      getToastErrorMessage(
        auctionsQuery.error,
        "Не удалось загрузить список аукционов",
      ),
    );
  }, [
    auctionsQuery.error,
    auctionsQuery.errorUpdatedAt,
    auctionsQuery.isError,
  ]);

  function updatePage(page: number) {
    void navigate({
      search: (previous) => ({
        ...previous,
        page,
      }),
    });
  }

  function updatePageSize(perPage: number) {
    void navigate({
      search: (previous) => ({
        ...previous,
        page: 1,
        per_page: perPage,
      }),
    });
  }

  function updateFilters(filters: {
    auctionType: AuctionsListTypeSearch;
    cargoNum: string;
    currentPriceFrom: string;
    currentPriceTo: string;
    isAvailable?: boolean;
    isBidder?: boolean;
    isFavorite?: boolean;
    loadCity: string;
    loadDateFrom: string;
    loadDateTo: string;
    pricePerKmFrom: string;
    pricePerKmTo: string;
    tradingStatus: AuctionsListTradingStatusSearch;
    unloadCity: string;
    unloadDateFrom: string;
    unloadDateTo: string;
    weightFrom: string;
    weightTo: string;
  }) {
    const weightFrom = Number(filters.weightFrom);
    const weightTo = Number(filters.weightTo);
    const currentPriceFrom = Number(filters.currentPriceFrom);
    const currentPriceTo = Number(filters.currentPriceTo);
    const pricePerKmFrom = Number(filters.pricePerKmFrom);
    const pricePerKmTo = Number(filters.pricePerKmTo);

    void navigate({
      search: (previous) => ({
        ...previous,
        page: 1,
        auc_type: filters.auctionType,
        cargo_num: filters.cargoNum || undefined,
        current_price_from:
          Number.isFinite(currentPriceFrom) && currentPriceFrom > 0
            ? currentPriceFrom
            : undefined,
        current_price_to:
          Number.isFinite(currentPriceTo) && currentPriceTo > 0
            ? currentPriceTo
            : undefined,
        is_available: filters.isAvailable,
        is_bidder: filters.isBidder,
        is_favorite: filters.isFavorite,
        load_city: filters.loadCity || undefined,
        load_date_from: filters.loadDateFrom || undefined,
        load_date_to: filters.loadDateTo || undefined,
        price_per_km_from:
          Number.isFinite(pricePerKmFrom) && pricePerKmFrom > 0
            ? pricePerKmFrom
            : undefined,
        price_per_km_to:
          Number.isFinite(pricePerKmTo) && pricePerKmTo > 0
            ? pricePerKmTo
            : undefined,
        status: filters.tradingStatus,
        unload_city: filters.unloadCity || undefined,
        unload_date_from: filters.unloadDateFrom || undefined,
        unload_date_to: filters.unloadDateTo || undefined,
        weight_from:
          Number.isFinite(weightFrom) && weightFrom > 0
            ? weightFrom
            : undefined,
        weight_to:
          Number.isFinite(weightTo) && weightTo > 0 ? weightTo : undefined,
      }),
    });
    closeFilters();
  }

  function resetFilters() {
    void navigate({
      search: () => ({
        page: 1,
        per_page: search.per_page,
        sort: search.sort,
        auc_type: "all",
        cargo_num: undefined,
        current_price_from: undefined,
        current_price_to: undefined,
        is_available: undefined,
        is_bidder: undefined,
        is_favorite: undefined,
        load_city: undefined,
        load_date_from: undefined,
        load_date_to: undefined,
        price_per_km_from: undefined,
        price_per_km_to: undefined,
        status: "all",
        unload_city: undefined,
        unload_date_from: undefined,
        unload_date_to: undefined,
        weight_from: undefined,
        weight_to: undefined,
      }),
    });
    closeFilters();
  }

  function updateSort(sort: AuctionsListSort) {
    void navigate({
      search: (previous) => ({
        ...previous,
        page: 1,
        sort,
      }),
    });
  }

  return (
    <main className="relative flex h-screen overflow-hidden bg-background text-foreground">
      <section className="flex min-h-0 w-full flex-col overflow-hidden lg:flex-row">
        <AuctionsListFilters
          auctionType={search.auc_type}
          cargoNum={search.cargo_num ?? ""}
          currentPriceFrom={
            search.current_price_from ? String(search.current_price_from) : ""
          }
          currentPriceTo={
            search.current_price_to ? String(search.current_price_to) : ""
          }
          isAvailable={search.is_available}
          isBidder={search.is_bidder}
          isFavorite={search.is_favorite}
          isOpen={isFiltersOpen}
          loadCity={search.load_city ?? ""}
          loadDateFrom={search.load_date_from ?? ""}
          loadDateTo={search.load_date_to ?? ""}
          onApply={updateFilters}
          onReset={resetFilters}
          pricePerKmFrom={
            search.price_per_km_from ? String(search.price_per_km_from) : ""
          }
          pricePerKmTo={
            search.price_per_km_to ? String(search.price_per_km_to) : ""
          }
          tradingStatus={search.status}
          unloadCity={search.unload_city ?? ""}
          unloadDateFrom={search.unload_date_from ?? ""}
          unloadDateTo={search.unload_date_to ?? ""}
          weightFrom={search.weight_from ? String(search.weight_from) : ""}
          weightTo={search.weight_to ? String(search.weight_to) : ""}
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <AuctionsListToolbar
            activeFilters={
              <AuctionsListActiveFilters
                onReset={resetFilters}
                search={search}
              />
            }
            from={auctionsQuery.data?.meta.from}
            isFiltersOpen={isFiltersOpen}
            onFiltersToggle={toggleFilters}
            onSortChange={updateSort}
            sort={search.sort}
            to={auctionsQuery.data?.meta.to}
            total={auctionsQuery.data?.meta.total}
          />

          <div className="min-h-0 flex-1 overflow-y-auto">
            {auctionsQuery.isLoading ? (
              <div className="p-5">
                <AuctionsListSkeleton />
              </div>
            ) : null}

            {auctionsQuery.isError ? (
              <div className="p-5">
                <AuctionsListErrorState
                  onRetry={() => void auctionsQuery.refetch()}
                />
              </div>
            ) : null}

            {auctionsQuery.data?.data.length === 0 ? (
              <div className="p-5">
                <AuctionsListEmptyState />
              </div>
            ) : null}

            {auctionsQuery.data?.data.length ? (
              <div className="grid max-w-[1100px] gap-4 p-5 xl:grid-cols-2">
                {auctionsQuery.data.data.map((auction) => (
                  <AuctionListRow
                    key={auction.main.order_uid}
                    auction={auction}
                    onRoutePreview={setRoutePreviewAuction}
                  />
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
      <RouteMapPanel
        auction={routePreviewAuction}
        onClose={() => setRoutePreviewAuction(null)}
      />
    </main>
  );
}
