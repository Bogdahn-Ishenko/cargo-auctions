import { RiCloseLine } from "@remixicon/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAuctionTypeLabel, getTradingStatusLabel } from "@/entities/Auction/lib/GetAuctionLabels"
import type { AuctionsListSearch } from "../model/AuctionsListSearch.schema"

interface AuctionsListActiveFiltersProps {
  onReset: () => void
  search: AuctionsListSearch
}

export function AuctionsListActiveFilters({ onReset, search }: AuctionsListActiveFiltersProps) {
  const filters = getActiveFilters(search)

  if (!filters.length) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => (
        <Badge className="border-slate-700 bg-slate-800 text-slate-300" key={filter} variant="outline">
          {filter}
        </Badge>
      ))}
      <Button
        className="h-7 border-slate-700 bg-slate-800 px-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-slate-100"
        onClick={onReset}
        type="button"
        variant="outline"
      >
        <RiCloseLine />
        Сбросить
      </Button>
    </div>
  )
}

function getActiveFilters(search: AuctionsListSearch) {
  const filters: string[] = []

  if (search.cargo_num) filters.push(`Заявка: ${search.cargo_num}`)
  if (search.auc_type !== "all") filters.push(`Тип: ${getAuctionTypeLabel(search.auc_type)}`)
  if (search.status !== "all") filters.push(`Участие: ${getTradingStatusLabel(search.status)}`)
  if (search.is_available) filters.push("Только доступные")
  if (search.is_favorite) filters.push("Только избранные")
  if (search.weight_from) filters.push(`Вес от ${search.weight_from} т`)
  if (search.weight_to) filters.push(`Вес до ${search.weight_to} т`)
  if (search.price_per_km_from) filters.push(`Цена/км от ${search.price_per_km_from} ₽`)
  if (search.price_per_km_to) filters.push(`Цена/км до ${search.price_per_km_to} ₽`)

  return filters
}
