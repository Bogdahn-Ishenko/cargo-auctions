import { RiCloseLine, RiMapPin2Line, RiRouteLine } from "@remixicon/react";
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types";
import { formatPrice } from "@/shared/lib/FormatPrice";
import { buildAuctionRouteMap } from "../model/BuildAuctionRouteMap";

interface RouteMapPanelProps {
  auction: AuctionListItem | null;
  onClose: () => void;
}

export function RouteMapPanel({ auction, onClose }: RouteMapPanelProps) {
  const routeMap = auction ? buildAuctionRouteMap(auction) : null;

  if (!auction) return null;

  return (
    <div className="absolute inset-y-0 right-0 z-30 flex w-full justify-end bg-background/40 backdrop-blur-[2px] sm:w-[460px] sm:bg-transparent sm:backdrop-blur-none">
      <aside className="flex h-full w-full flex-col border-l border-border bg-card text-card-foreground shadow-2xl">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border p-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              <RiRouteLine className="size-4" />
              Рекомендованный маршрут
            </div>
            <div className="mt-1 truncate font-mono text-sm font-bold text-foreground">
              {auction.main.cargo_num}
            </div>
          </div>
          <Button
            aria-label="Закрыть карту"
            className="size-8 shrink-0 text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={onClose}
            size="icon"
            type="button"
            variant="ghost"
          >
            <RiCloseLine />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {routeMap ? (
            <div className="grid gap-4">
              <div className="h-[360px] overflow-hidden rounded-xl border border-border bg-muted">
                <MapContainer
                  bounds={routeMap.points.map((point) => point.coordinates)}
                  boundsOptions={{ padding: [36, 36] }}
                  className="h-full w-full"
                  key={auction.main.order_uid}
                  scrollWheelZoom
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Polyline
                    pathOptions={{
                      color: "var(--primary)",
                      opacity: 0.9,
                      weight: 5,
                    }}
                    positions={routeMap.polyline}
                  />
                  {routeMap.points.map((point) => (
                    <CircleMarker
                      center={point.coordinates}
                      key={point.label}
                      pathOptions={{
                        color:
                          point.label === "Погрузка"
                            ? "var(--primary)"
                            : "var(--accent)",
                        fillColor:
                          point.label === "Погрузка"
                            ? "var(--primary)"
                            : "var(--accent)",
                        fillOpacity: 1,
                      }}
                      radius={8}
                    >
                      <Tooltip direction="top" offset={[0, -8]} permanent>
                        {point.label}: {point.city}
                      </Tooltip>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <RouteMetric label="Дистанция" value={`${routeMap.distanceKm} км`} />
                <RouteMetric label="В пути" value={`${routeMap.durationHours} ч`} />
              </div>

              <Card className="rounded-xl border-border bg-muted py-0">
                <CardContent className="grid gap-3 p-3">
                  {routeMap.points.map((point) => (
                    <div className="flex items-start gap-3" key={point.label}>
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-card text-primary">
                        <RiMapPin2Line className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          {point.label}
                        </div>
                        <div className="truncate text-sm font-semibold text-foreground">
                          {point.city}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="rounded-xl border border-border bg-muted p-3 text-xs leading-5 text-muted-foreground">
                Маршрут рассчитан локально по mock-координатам городов. Для
                production можно подключить OSRM, GraphHopper, Valhalla или
                коммерческий truck-routing API.
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-muted p-8 text-center">
              <div className="text-sm font-semibold text-foreground">
                Координаты маршрута не найдены
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Для одного из городов нет mock-координат
              </div>
            </div>
          )}
        </div>

        <div className="grid shrink-0 gap-2 border-t border-border p-4 text-xs text-muted-foreground">
          <div className="flex items-center justify-between gap-3">
            <span>Текущая цена</span>
            <span className="font-mono font-semibold text-foreground">
              {formatPrice(auction.trading.price?.current ?? null)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Цена за км</span>
            <span className="font-mono font-semibold text-foreground">
              {formatPrice(auction.main.price_per_km ?? null)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function RouteMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted p-3">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-mono text-lg font-bold text-foreground">
        {value}
      </div>
    </div>
  );
}
