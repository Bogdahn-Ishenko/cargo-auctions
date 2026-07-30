import { Badge } from "@/components/ui/badge"
import { getAuctionStatusLabel, getAuctionTypeLabel, getTradingStatusLabel } from "@/entities/Auction/lib/GetAuctionLabels"
import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types"

interface AuctionListBadgesProps {
  auction: AuctionListItem
}

export function AuctionListBadges({ auction }: AuctionListBadgesProps) {
  const isLeading = auction.trading.status_mobile === "Leading"
  const isLosing = auction.trading.status_mobile === "Losing"

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="border-sky-200 bg-sky-50 text-sky-700" variant="outline">
        {getAuctionTypeLabel(auction.main.auc_type)}
      </Badge>
      <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700" variant="outline">
        {getAuctionStatusLabel(auction.trading.status)}
      </Badge>
      <Badge
        className={
          isLeading
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : isLosing
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : "border-slate-200 bg-slate-50 text-slate-500"
        }
        variant="outline"
      >
        {getTradingStatusLabel(auction.trading.status_mobile)}
      </Badge>
    </div>
  )
}
