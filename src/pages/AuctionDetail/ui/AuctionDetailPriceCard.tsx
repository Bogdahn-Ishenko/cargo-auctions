import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types"
import { formatPrice } from "@/shared/lib/FormatPrice"

interface AuctionDetailPriceCardProps {
  auction: AuctionDetailResponse
}

export function AuctionDetailPriceCard({ auction }: AuctionDetailPriceCardProps) {
  const price = auction.trading.price

  return (
    <Card>
      <CardHeader>
        <CardTitle>Цена</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm">
        <InfoItem label="Текущая" value={formatPrice(price?.current ?? null)} />
        <InfoItem label="Минимум" value={formatPrice(price?.min ?? null)} />
        <InfoItem label="Максимум" value={formatPrice(price?.max ?? null)} />
        <InfoItem label="Шаг" value={formatPrice(price?.step ?? null)} />
        <InfoItem label="Оплата" value={auction.payment.form} />
      </CardContent>
    </Card>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  )
}
