import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BetItem } from "@/entities/Auction/model/AuctionBets.types";
import { formatPrice } from "@/shared/lib/FormatPrice";
import { formatDateTime } from "../lib/FormatDateTime";

interface AuctionBidsTableProps {
  bets: BetItem[];
  isHidden: boolean;
  isPlacesHidden: boolean;
  isError: boolean;
  isLoading: boolean;
}

export function AuctionBidsTable({
  bets,
  isError,
  isHidden,
  isLoading,
  isPlacesHidden,
}: AuctionBidsTableProps) {
  const participantsCount = new Set(bets.map((bet) => bet.organization_id))
    .size;

  return (
    <Card className="rounded-2xl border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Таблица участников
        </CardTitle>
        <span className="font-mono text-[11px] text-muted-foreground">
          {participantsCount} участников · {bets.length} ставок
        </span>
      </CardHeader>
      <CardContent>
        {isHidden ? (
          <div className="rounded-xl border border-dashed border-border bg-muted p-8 text-center">
            <div className="text-sm font-semibold text-foreground">
              История ставок скрыта
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Организатор ограничил просмотр истории по этому аукциону
            </div>
          </div>
        ) : null}

        {!isHidden && isLoading ? (
          <div className="rounded-xl border border-dashed border-border bg-muted p-8 text-center">
            <div className="text-sm font-semibold text-foreground">
              Загрузка ставок
            </div>
          </div>
        ) : null}

        {!isHidden && isError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-8 text-center">
            <div className="text-sm font-semibold text-rose-700">
              Не удалось загрузить ставки
            </div>
          </div>
        ) : null}

        {!isHidden && !isLoading && !isError && bets.length ? (
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs text-muted-foreground">
                  Место
                </TableHead>
                <TableHead className="text-xs text-muted-foreground">
                  Перевозчик
                </TableHead>
                <TableHead className="text-right text-xs text-muted-foreground">
                  С НДС
                </TableHead>
                <TableHead className="text-right text-xs text-muted-foreground">
                  Без НДС
                </TableHead>
                <TableHead className="text-right text-xs text-muted-foreground">
                  Время
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bets.map((bet) => (
                <TableRow
                  className="border-border hover:bg-muted/70"
                  key={bet.id}
                >
                  <TableCell className="py-3">
                    <span className="flex size-6 items-center justify-center rounded-full bg-muted font-mono text-xs font-bold text-muted-foreground">
                      {isPlacesHidden ? "-" : (bet.place ?? "-")}
                    </span>
                    {isPlacesHidden ? (
                      <div className="mt-1 text-[10px] text-muted-foreground">
                        Скрыто
                      </div>
                    ) : null}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {bet.organization_name || "Перевозчик не указан"}
                      </span>
                      {bet.is_win ? (
                        <Badge
                          className="border-emerald-200 bg-emerald-50 text-emerald-700"
                          variant="outline"
                        >
                          Победитель
                        </Badge>
                      ) : null}
                      {bet.is_rejected ? (
                        <Badge
                          className="border-rose-200 bg-rose-50 text-rose-700"
                          variant="outline"
                        >
                          Отклонена
                        </Badge>
                      ) : null}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {bet.contact_name}
                    </div>
                    {bet.is_rejected && bet.cancel_reason ? (
                      <div className="mt-1 text-xs text-rose-600">
                        {bet.cancel_reason}
                      </div>
                    ) : null}
                  </TableCell>
                  <TableCell className="py-3 text-right font-mono text-sm font-bold text-foreground">
                    {formatPrice(bet.price_with_vat)}
                  </TableCell>
                  <TableCell className="py-3 text-right font-mono text-xs text-muted-foreground">
                    {formatPrice(bet.price_no_vat)}
                  </TableCell>
                  <TableCell className="py-3 text-right font-mono text-xs text-muted-foreground">
                    {formatDateTime(bet.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}

        {!isHidden && !isLoading && !isError && !bets.length ? (
          <div className="rounded-xl border border-dashed border-border bg-muted p-8 text-center">
            <div className="text-sm font-semibold text-foreground">
              Ставок пока нет
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Участники появятся после первой ставки
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
