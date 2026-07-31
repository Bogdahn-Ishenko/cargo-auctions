import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types";
import { formatPrice } from "@/shared/lib/FormatPrice";

interface AuctionDetailInfoTableProps {
  auction: AuctionDetailResponse;
}

export function AuctionDetailInfoTable({
  auction,
}: AuctionDetailInfoTableProps) {
  const car = auction.cargo.car;
  const rows = [
    { label: "Наименование", value: auction.cargo.name ?? "Не указано" },
    {
      label: "Цена груза",
      value: auction.trading.no_view_cargo_price
        ? "Скрыта организатором"
        : formatPrice(Number(auction.cargo.price) || null),
    },
    {
      label: "Вес",
      value: auction.cargo.weight ? `${auction.cargo.weight} т` : "Не указан",
    },
    {
      label: "Объем",
      value: auction.cargo.volume ? `${auction.cargo.volume} м3` : "Не указан",
    },
    { label: "Тип кузова", value: auction.cargo.body_type },
    { label: "Машин", value: String(auction.cargo.truck_count) },
    {
      label: "Расстояние",
      value: auction.cargo.distance
        ? `${auction.cargo.distance} км`
        : "Не указано",
    },
    { label: "Оплата", value: auction.payment.form },
    {
      label: "Отсрочка",
      value: auction.payment.delay_days
        ? `${auction.payment.delay_days} дней`
        : "Не указана",
    },
    { label: "Тип ТС", value: car?.type ?? "Не указан" },
    {
      label: "Грузоподъемность ТС",
      value: car?.weight ? `${car.weight} т` : "Не указана",
    },
    {
      label: "Объем ТС",
      value: car?.volume ? `${car.volume} м3` : "Не указан",
    },
    {
      label: "Габариты ТС",
      value:
        car?.length && car.width && car.height
          ? `${car.length} x ${car.width} x ${car.height} м`
          : "Не указаны",
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        Параметры груза и оплаты
      </h2>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              className="border-border hover:bg-muted/70"
              key={row.label}
            >
              <TableCell className="w-36 py-2.5 text-xs text-muted-foreground">
                {row.label}
              </TableCell>
              <TableCell className="py-2.5 text-right text-xs font-medium text-foreground">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
