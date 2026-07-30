import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types"
import { formatAuctionDate } from "../lib/FormatAuctionDate"

interface AuctionRoutePreviewProps {
  auction: AuctionListItem
}

export function AuctionRoutePreview({ auction }: AuctionRoutePreviewProps) {
  const distance = auction.main.price_per_km ? `${auction.main.price_per_km} ₽/км` : "Расстояние не указано"

  return (
    <div className="my-4">
      <div className="mb-2 flex items-center gap-2">
        <div className="size-2.5 shrink-0 rounded-full bg-blue-500 ring-[3px] ring-blue-100" />
        <div className="relative flex flex-1 items-center">
          <div className="h-px w-full bg-gradient-to-r from-blue-200 via-slate-200 to-emerald-200" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded border border-slate-100 bg-white px-1.5 font-mono text-[9px] text-slate-400">
              {distance}
            </span>
          </div>
        </div>
        <div className="size-2.5 shrink-0 rounded-full bg-emerald-500 ring-[3px] ring-emerald-100" />
      </div>

      <div className="flex justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold leading-tight text-slate-800">
            {auction.route.load.city}
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-slate-400">
            {formatAuctionDate(auction.route.load.date)}
          </div>
        </div>
        <div className="min-w-0 text-right">
          <div className="truncate text-sm font-semibold leading-tight text-slate-800">
            {auction.route.unload.city}
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-slate-400">
            {formatAuctionDate(auction.route.unload.date)}
          </div>
        </div>
      </div>
    </div>
  )
}
