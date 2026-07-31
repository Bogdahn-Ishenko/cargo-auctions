import { Link } from "@tanstack/react-router"
import { RiArrowRightLine, RiBookmarkFill } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types"
import { formatPrice } from "@/shared/lib/FormatPrice"
import { usePrefetchAuctionDetail } from "../api/UsePrefetchAuctionDetail"
import { AuctionCargoChips } from "./AuctionCargoChips"
import { AuctionListBadges } from "./AuctionListBadges"
import { AuctionRoutePreview } from "./AuctionRoutePreview"

interface AuctionListRowProps {
  auction: AuctionListItem
}

export function AuctionListRow({ auction }: AuctionListRowProps) {
  const currentPrice = auction.trading.price?.current ?? null
  const prefetchAuctionDetail = usePrefetchAuctionDetail()
  const primaryAction = getPrimaryActionLabel(auction)
  const sideBarClass = auction.trading.status_mobile === "Leading"
    ? "bg-emerald-500"
    : auction.trading.status_mobile === "Losing"
      ? "bg-rose-600"
      : "bg-slate-200"

  return (
    <Card
      className="relative gap-0 overflow-hidden rounded-2xl border-slate-200 bg-white py-0 shadow-sm transition-shadow hover:shadow-lg"
      onFocus={() => prefetchAuctionDetail(auction.main.order_uid)}
      onMouseEnter={() => prefetchAuctionDetail(auction.main.order_uid)}
    >
      <div className={`absolute bottom-0 left-0 top-0 w-1 ${sideBarClass}`} />
      <CardContent className="grid gap-4 p-5 pl-6 lg:grid-cols-[minmax(0,1fr)_190px]">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 font-mono text-[13px] font-bold tracking-tight text-slate-900">
                <span>{auction.main.cargo_num}</span>
                {auction.trading.is_favorite ? (
                  <RiBookmarkFill className="size-4 shrink-0 text-amber-500" aria-label="В избранном" />
                ) : null}
              </div>
              <div className="mt-0.5 truncate text-xs text-slate-500">
                {auction.organizer.organization_name}
              </div>
            </div>
            <AuctionListBadges auction={auction} />
          </div>

          <AuctionRoutePreview auction={auction} />
          <AuctionCargoChips auction={auction} />
        </div>

        <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div>
            <div className="mb-1 text-[10px] font-medium uppercase text-slate-500">
              Текущая цена
            </div>
            <div className="font-mono text-xl font-bold tracking-tight text-slate-900">
              {formatPrice(currentPrice)}
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              {auction.trading.can_set_bet ? "Ставка доступна" : "Ставка недоступна"}
            </div>
          </div>
          <Button asChild className="w-full" variant={auction.trading.can_set_bet ? "default" : "outline"}>
            <Link
              params={{ auctionUuid: auction.main.order_uid }}
              search={{ bet: auction.trading.can_set_bet }}
              to="/auctions/$auctionUuid"
            >
              {primaryAction}
              <RiArrowRightLine />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function getPrimaryActionLabel(auction: AuctionListItem) {
  if (!auction.trading.can_set_bet) return "Смотреть ставки"

  return auction.trading.status_mobile === "NotParticipating" ? "Сделать ставку" : "Изменить ставку"
}
