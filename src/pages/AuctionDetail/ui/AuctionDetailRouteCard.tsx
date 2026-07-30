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
    <Card>
      <CardHeader>
        <CardTitle>Маршрут</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {routes.map((route) => (
          <div key={`${route.row_num}-${route.op_type}`} className="rounded-lg border p-3 text-sm">
            <div className="font-medium">
              {getOperationLabel(route.op_type)}: {route.location.city_name}
            </div>
            <div className="mt-1 text-muted-foreground">{route.location.loading_address}</div>
            <div className="mt-2 text-muted-foreground">{formatDateTime(route.start_date)}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
