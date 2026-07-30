import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types"

interface AuctionDetailInfoTableProps {
  auction: AuctionDetailResponse
}

export function AuctionDetailInfoTable({ auction }: AuctionDetailInfoTableProps) {
  const rows = [
    { label: "Наименование", value: auction.cargo.name ?? "Не указано" },
    { label: "Вес", value: auction.cargo.weight ? `${auction.cargo.weight} т` : "Не указан" },
    { label: "Объем", value: auction.cargo.volume ? `${auction.cargo.volume} м3` : "Не указан" },
    { label: "Тип кузова", value: auction.cargo.body_type },
    { label: "Машин", value: String(auction.cargo.truck_count) },
    {
      label: "Расстояние",
      value: auction.cargo.distance ? `${auction.cargo.distance} км` : "Не указано",
    },
    { label: "Оплата", value: auction.payment.form },
    {
      label: "Отсрочка",
      value: auction.payment.delay_days ? `${auction.payment.delay_days} дней` : "Не указана",
    },
  ]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
        Параметры груза и оплаты
      </h2>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow className="border-slate-100 hover:bg-slate-50/70" key={row.label}>
              <TableCell className="w-36 py-2.5 text-xs text-slate-500">{row.label}</TableCell>
              <TableCell className="py-2.5 text-right text-xs font-medium text-slate-800">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
