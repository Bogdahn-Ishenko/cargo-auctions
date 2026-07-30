import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types"
import { formatDateTime } from "../lib/FormatDateTime"

interface AuctionDetailHeaderProps {
  auction: AuctionDetailResponse
}

export function AuctionDetailHeader({ auction }: AuctionDetailHeaderProps) {
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
      <CardContent className="grid gap-3 text-sm sm:grid-cols-3">
        <InfoItem label="Груз" value={auction.cargo.name ?? "Не указан"} />
        <InfoItem label="Кузов" value={auction.cargo.body_type} />
        <InfoItem label="Окончание торгов" value={formatDateTime(auction.trading.stop_time)} />
      </CardContent>
    </Card>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  )
}
