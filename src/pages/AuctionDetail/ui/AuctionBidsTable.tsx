import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { BetItem } from "@/entities/Auction/model/AuctionBets.types"
import { formatPrice } from "@/shared/lib/FormatPrice"
import { formatDateTime } from "../lib/FormatDateTime"

interface AuctionBidsTableProps {
  bets: BetItem[]
  isError: boolean
  isLoading: boolean
}

export function AuctionBidsTable({ bets, isError, isLoading }: AuctionBidsTableProps) {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Таблица участников
        </CardTitle>
        <span className="font-mono text-[11px] text-slate-400">{bets.length} ставок</span>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <div className="text-sm font-semibold text-slate-700">Загрузка ставок</div>
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-8 text-center">
            <div className="text-sm font-semibold text-rose-700">Не удалось загрузить ставки</div>
          </div>
        ) : null}

        {!isLoading && !isError && bets.length ? (
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="text-xs text-slate-500">Место</TableHead>
                <TableHead className="text-xs text-slate-500">Перевозчик</TableHead>
                <TableHead className="text-right text-xs text-slate-500">Ставка</TableHead>
                <TableHead className="text-right text-xs text-slate-500">Время</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bets.map((bet) => (
                <TableRow className="border-slate-100 hover:bg-slate-50/70" key={bet.id}>
                  <TableCell className="py-3">
                    <span className="flex size-6 items-center justify-center rounded-full bg-slate-100 font-mono text-xs font-bold text-slate-600">
                      {bet.place ?? "-"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-slate-800">
                        {bet.organization_name || "Перевозчик не указан"}
                      </span>
                      {bet.is_win ? (
                        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700" variant="outline">
                          Победитель
                        </Badge>
                      ) : null}
                      {bet.is_rejected ? (
                        <Badge className="border-rose-200 bg-rose-50 text-rose-700" variant="outline">
                          Отклонена
                        </Badge>
                      ) : null}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">{bet.contact_name}</div>
                  </TableCell>
                  <TableCell className="py-3 text-right font-mono text-sm font-bold text-slate-900">
                    {formatPrice(bet.price_with_vat)}
                  </TableCell>
                  <TableCell className="py-3 text-right font-mono text-xs text-slate-400">
                    {formatDateTime(bet.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}

        {!isLoading && !isError && !bets.length ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <div className="text-sm font-semibold text-slate-700">Ставок пока нет</div>
            <div className="mt-1 text-xs text-slate-500">Участники появятся после первой ставки</div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
