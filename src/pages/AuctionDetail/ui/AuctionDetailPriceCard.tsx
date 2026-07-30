import { RiBookmarkFill, RiBookmarkLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToggleAuctionFavorite } from "@/entities/Auction/api/UseToggleAuctionFavorite"
import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types"
import { formatPrice } from "@/shared/lib/FormatPrice"
import { AuctionBetForm } from "./AuctionBetForm"

interface AuctionDetailPriceCardProps {
  auction: AuctionDetailResponse
}

export function AuctionDetailPriceCard({ auction }: AuctionDetailPriceCardProps) {
  const price = auction.trading.price
  const favoriteMutation = useToggleAuctionFavorite(auction.main.order_uid)
  const isFavorite = auction.trading.is_favorite

  return (
    <Card className="h-fit rounded-2xl border-slate-800 bg-slate-950 py-0 text-slate-100 shadow-sm">
      <CardHeader className="border-b border-slate-800 p-4">
        <CardTitle className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Торговая панель
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-2 text-[10px] font-medium uppercase text-slate-500">Текущая цена</div>
          <div className="font-mono text-3xl font-bold tracking-tight text-white">
            {formatPrice(price?.current ?? null)}
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
            <span>{formatPrice(price?.price_per_km ?? null)} / км</span>
            <span className="text-slate-700">·</span>
            <span>шаг {formatPrice(price?.step ?? null)}</span>
          </div>
        </div>

        <div className="grid gap-3 text-sm">
          <InfoItem label="Минимум" value={formatPrice(price?.min ?? null)} />
          <InfoItem label="Максимум" value={formatPrice(price?.max ?? null)} />
          <InfoItem label="Оплата" value={auction.payment.form} />
        </div>

        <Separator className="bg-slate-800" />

        <AuctionBetForm auction={auction} />
        <Button
          className="h-10 w-full border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
          disabled={favoriteMutation.isPending}
          onClick={() => favoriteMutation.mutate()}
          type="button"
          variant="outline"
        >
          {isFavorite ? <RiBookmarkFill className="text-amber-500" /> : <RiBookmarkLine />}
          {isFavorite ? "В избранном" : "В избранное"}
        </Button>
      </CardContent>
    </Card>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-200">{value}</span>
    </div>
  )
}
