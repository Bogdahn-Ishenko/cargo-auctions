import type { ReactNode } from "react";
import { RiBox3Line, RiMapPin2Line, RiTruckLine } from "@remixicon/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAuctionStatusLabel,
  getAuctionTypeLabel,
  getTradingStatusLabel,
} from "@/entities/Auction/lib/GetAuctionLabels";
import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types";
import { formatDateTime } from "@/shared/lib/FormatDateTime";

interface AuctionDetailHeaderProps {
  auction: AuctionDetailResponse;
}

export function AuctionDetailHeader({ auction }: AuctionDetailHeaderProps) {
  const loadPoint = auction.routes.find((route) => route.op_type === "Loading");
  const unloadPoint = auction.routes.find(
    (route) => route.op_type === "Unloading",
  );
  const statusClass =
    auction.trading.status_mobile === "Leading"
      ? "bg-emerald-500"
      : auction.trading.status_mobile === "Losing"
        ? "bg-rose-600"
        : "bg-border";

  return (
    <Card className="relative overflow-hidden rounded-2xl border-border bg-card py-0 shadow-sm">
      <div className={`absolute bottom-0 left-0 top-0 w-1 ${statusClass}`} />
      <CardContent className="p-6 pl-7">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-mono text-xl font-bold tracking-tight text-card-foreground">
              {auction.main.cargo_num}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Заказчик:{" "}
              <span className="font-medium text-foreground">
                {auction.organizer.organization_name}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              className="border-primary/30 bg-primary/10 text-primary"
              variant="outline"
            >
              {getAuctionTypeLabel(auction.main.auc_type)}
            </Badge>
            <Badge
              className="border-emerald-200 bg-emerald-50 text-emerald-700"
              variant="outline"
            >
              {getAuctionStatusLabel(auction.trading.status)}
            </Badge>
            <Badge
              className="border-border bg-muted text-muted-foreground"
              variant="outline"
            >
              {getTradingStatusLabel(auction.trading.status_mobile)}
            </Badge>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <InfoItem
            icon={<RiBox3Line />}
            label="Груз"
            value={auction.cargo.name ?? "Не указан"}
          />
          <InfoItem
            icon={<RiMapPin2Line />}
            label="Маршрут"
            value={`${loadPoint?.location.city_name ?? "Не указано"} - ${unloadPoint?.location.city_name ?? "Не указано"}`}
          />
          <InfoItem
            icon={<RiTruckLine />}
            label="Окончание торгов"
            value={formatDateTime(auction.trading.stop_time)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted p-3">
      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="[&_svg]:size-4">{icon}</span>
        {label}
      </div>
      <div className="text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
