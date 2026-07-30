import { RiMapPin2Line } from "@remixicon/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AuctionDetailRoutePoint } from "@/entities/Auction/model/AuctionDetail.types"
import { formatDateTime } from "../lib/FormatDateTime"

interface AuctionDetailRouteCardProps {
  routes: AuctionDetailRoutePoint[]
}

function getOperationLabel(opType: AuctionDetailRoutePoint["op_type"]) {
  switch (opType) {
    case "Loading":
      return "Погрузка"
    case "Unloading":
      return "Выгрузка"
    default:
      return "Операция"
  }
}

export function AuctionDetailRouteCard({ routes }: AuctionDetailRouteCardProps) {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Маршрут и точки
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-0">
        {routes.map((route, index) => (
          <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 pb-5 last:pb-0" key={`${route.row_num}-${route.op_type}`}>
            <div className="flex flex-col items-center">
              <div className="flex size-7 items-center justify-center rounded-full bg-slate-900 text-white">
                <RiMapPin2Line className="size-3.5" />
              </div>
              {index < routes.length - 1 ? <div className="mt-2 h-full w-px bg-slate-200" /> : null}
            </div>
            <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm">
              <div className="font-semibold text-slate-800">
                {getOperationLabel(route.op_type)}: {route.location.city_name}
              </div>
              <div className="mt-1 text-xs text-slate-500">{route.location.loading_address}</div>
              <div className="mt-2 font-mono text-[11px] text-slate-400">
                {formatDateTime(route.start_date)}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
