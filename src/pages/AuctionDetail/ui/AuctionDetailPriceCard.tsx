import { RiBookmarkFill, RiBookmarkLine } from "@remixicon/react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToggleAuctionFavorite } from "@/entities/Auction/api/UseToggleAuctionFavorite";
import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types";
import { formatPrice } from "@/shared/lib/FormatPrice";
import { AuctionBetForm } from "./AuctionBetForm";

interface AuctionDetailPriceCardProps {
  auction: AuctionDetailResponse;
  isBetMode: boolean;
}

export function AuctionDetailPriceCard({
  auction,
  isBetMode,
}: AuctionDetailPriceCardProps) {
  const price = auction.trading.price;
  const favoriteMutation = useToggleAuctionFavorite(auction.main.order_uid);
  const isFavorite = auction.trading.is_favorite;

  return (
    <Card className="h-fit rounded-2xl border-border bg-card py-0 text-card-foreground shadow-sm">
      <CardHeader className="border-b border-border p-4">
        <CardTitle className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Торговая панель
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        <div className="rounded-xl border border-border bg-muted p-4">
          <div className="mb-2 text-[10px] font-medium uppercase text-muted-foreground">
            Текущая цена
          </div>
          <div className="font-mono text-3xl font-bold tracking-tight text-foreground">
            {formatPrice(price?.current ?? null)}
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
            <span>{formatPrice(price?.price_per_km ?? null)} / км</span>
            <span className="text-border">·</span>
            <span>шаг {formatPrice(price?.step ?? null)}</span>
          </div>
        </div>

        <div className="grid gap-3 text-sm">
          <InfoItem
            label="Доступная цена"
            value={formatPrice(price?.available ?? null)}
          />
          <InfoItem label="Минимум" value={formatPrice(price?.min ?? null)} />
          <InfoItem label="Максимум" value={formatPrice(price?.max ?? null)} />
          <InfoItem
            label="Моя ставка"
            value={formatPrice(auction.trading.your?.last_bet_with_vat ?? null)}
          />
          <InfoItem
            label="Участвую"
            value={auction.trading.your?.bet ? "Да" : "Нет"}
          />
          <InfoItem
            label="Продление после ставки"
            value={
              auction.trading.settings?.prolong_after_bet
                ? `${auction.trading.settings.prolong_after_bet} мин`
                : "Не указано"
            }
          />
          <InfoItem
            label="Передача ТС"
            value={
              auction.trading.settings?.transmission_time_in
                ? `${auction.trading.settings.transmission_time_in} ч`
                : "Не указана"
            }
          />
          <InfoItem label="Оплата" value={auction.payment.form} />
        </div>

        <Separator className="bg-border" />

        {isBetMode ? (
          <AuctionBetForm auction={auction} />
        ) : auction.trading.can_set_bet ? (
          <Button
            asChild
            className="h-10 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link
              params={{ auctionUuid: auction.main.order_uid }}
              search={{ bet: true }}
              to="/auctions/$auctionUuid"
            >
              {auction.trading.status_mobile === "NotParticipating"
                ? "Сделать ставку"
                : "Изменить ставку"}
            </Link>
          </Button>
        ) : (
          <Button
            className="h-10 w-full"
            disabled
            type="button"
            variant="outline"
          >
            Ставка недоступна
          </Button>
        )}
        <Button
          className="h-10 w-full border-border bg-card text-foreground hover:bg-muted"
          disabled={favoriteMutation.isPending}
          onClick={() =>
            favoriteMutation.mutate({ nextIsFavorite: !isFavorite })
          }
          type="button"
          variant="outline"
        >
          {isFavorite ? (
            <RiBookmarkFill className="text-accent" />
          ) : (
            <RiBookmarkLine />
          )}
          {isFavorite ? "В избранном" : "В избранное"}
        </Button>
      </CardContent>
    </Card>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}
