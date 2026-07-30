import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types"
import { formatPrice } from "../lib/FormatPrice"

interface AuctionListRowProps {
  auction: AuctionListItem
}

export function AuctionListRow({ auction }: AuctionListRowProps) {
  const currentPrice = auction.trading.price?.current ?? null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>{auction.main.cargo_num}</span>
          <Badge variant="outline">{auction.main.auc_type}</Badge>
          <Badge variant={auction.trading.can_set_bet ? "default" : "secondary"}>
            {auction.trading.status_mobile}
          </Badge>
        </CardTitle>
        <CardDescription>{auction.organizer.organization_name}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="grid gap-1">
          <div>
            {auction.route.load.city} - {auction.route.unload.city}
          </div>
          <div className="text-muted-foreground">
            {auction.cargo.name}, {auction.cargo.weight} т, {auction.cargo.volume} м3
          </div>
        </div>
        <div className="font-medium">{formatPrice(currentPrice)}</div>
      </CardContent>
    </Card>
  )
}
