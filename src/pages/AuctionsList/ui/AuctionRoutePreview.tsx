import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types";
import { formatAuctionDate } from "../lib/FormatAuctionDate";

interface AuctionRoutePreviewProps {
  auction: AuctionListItem;
}

export function AuctionRoutePreview({ auction }: AuctionRoutePreviewProps) {
  const distance = auction.main.price_per_km
    ? `${auction.main.price_per_km} ₽/км`
    : "Расстояние не указано";

  return (
    <div className="my-4">
      <div className="mb-2 flex items-center gap-2">
        <div className="size-2.5 shrink-0 rounded-full bg-primary ring-[3px] ring-primary/20" />
        <div className="relative flex flex-1 items-center">
          <div className="h-px w-full bg-gradient-to-r from-primary/40 via-border to-accent/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded border border-border bg-card px-1.5 font-mono text-[9px] text-muted-foreground">
              {distance}
            </span>
          </div>
        </div>
        <div className="size-2.5 shrink-0 rounded-full bg-accent ring-[3px] ring-accent/25" />
      </div>

      <div className="flex justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold leading-tight text-foreground">
            {auction.route.load.city}
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            {formatAuctionDate(auction.route.load.date)}
          </div>
        </div>
        <div className="min-w-0 text-right">
          <div className="truncate text-sm font-semibold leading-tight text-foreground">
            {auction.route.unload.city}
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            {formatAuctionDate(auction.route.unload.date)}
          </div>
        </div>
      </div>
    </div>
  );
}
