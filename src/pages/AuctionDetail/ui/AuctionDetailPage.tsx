import { Link, useParams, useSearch } from "@tanstack/react-router";
import { RiArrowLeftLine } from "@remixicon/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuctionBets } from "@/entities/Auction/api/UseAuctionBets";
import { useAuctionDetail } from "@/entities/Auction/api/UseAuctionDetail";
import { getToastErrorMessage } from "@/shared/lib/GetToastErrorMessage";
import { AuctionBidsTable } from "@/widgets/BetsTable";
import { AuctionDetailContactsCard } from "./AuctionDetailContactsCard";
import { AuctionDetailErrorState } from "./AuctionDetailErrorState";
import { AuctionDetailHeader } from "./AuctionDetailHeader";
import { AuctionDetailInfoTable } from "./AuctionDetailInfoTable";
import { AuctionDetailPriceCard } from "./AuctionDetailPriceCard";
import { AuctionDetailRouteCard } from "./AuctionDetailRouteCard";
import { AuctionDetailSkeleton } from "./AuctionDetailSkeleton";

export function AuctionDetailPage() {
  const { auctionUuid } = useParams({ from: "/auctions/$auctionUuid" });
  const search = useSearch({ from: "/auctions/$auctionUuid" });
  const detailQuery = useAuctionDetail(auctionUuid);
  const betsQuery = useAuctionBets(auctionUuid);

  useEffect(() => {
    if (!detailQuery.isError) return;

    toast.error(
      getToastErrorMessage(detailQuery.error, "Не удалось загрузить аукцион"),
    );
  }, [detailQuery.error, detailQuery.errorUpdatedAt, detailQuery.isError]);

  useEffect(() => {
    if (!betsQuery.isError) return;

    toast.error(
      getToastErrorMessage(betsQuery.error, "Не удалось загрузить ставки"),
    );
  }, [betsQuery.error, betsQuery.errorUpdatedAt, betsQuery.isError]);

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-card px-5 py-3">
        <Button
          asChild
          className="text-muted-foreground hover:bg-muted hover:text-foreground"
          variant="ghost"
        >
          <Link
            to="/"
            search={{
              page: 1,
              per_page: 6,
              sort: "stop_time_asc",
              auc_type: "all",
              status: "all",
            }}
          >
            <RiArrowLeftLine />
            Список аукционов
          </Link>
        </Button>
        {detailQuery.data ? (
          <>
            <span className="text-border">/</span>
            <span className="font-mono text-sm font-semibold text-foreground">
              {detailQuery.data.main.cargo_num}
            </span>
          </>
        ) : null}
      </div>

      <section className="min-h-0 flex-1 overflow-y-auto p-5">
        <div className="mx-auto grid max-w-[1180px] gap-4">
          {detailQuery.isLoading ? <AuctionDetailSkeleton /> : null}

          {detailQuery.isError ? (
            <AuctionDetailErrorState
              onRetry={() => void detailQuery.refetch()}
            />
          ) : null}

          {detailQuery.data ? (
            <>
              <AuctionDetailHeader auction={detailQuery.data} />
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div className="grid gap-4">
                  <AuctionDetailRouteCard
                    hideContacts={
                      detailQuery.data.trading
                        .hide_points_address_and_contacts ?? false
                    }
                    routes={detailQuery.data.routes}
                  />
                  <AuctionDetailContactsCard auction={detailQuery.data} />
                  <AuctionDetailInfoTable auction={detailQuery.data} />
                  <AuctionBidsTable
                    bets={betsQuery.data?.bets ?? []}
                    isError={betsQuery.isError}
                    isHidden={
                      detailQuery.data.trading.hide_bets_history ?? false
                    }
                    isPlacesHidden={
                      detailQuery.data.trading.hide_places ?? false
                    }
                    isLoading={betsQuery.isLoading}
                  />
                </div>
                <AuctionDetailPriceCard
                  auction={detailQuery.data}
                  isBetMode={search.bet}
                />
              </div>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
