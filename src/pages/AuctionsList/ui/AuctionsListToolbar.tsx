import type { ReactNode } from "react"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import type { AuctionsListSort } from "../model/AuctionsListSearch.schema"

interface AuctionsListToolbarProps {
  activeFilters?: ReactNode
  from?: number
  onSortChange: (sort: AuctionsListSort) => void
  sort: AuctionsListSort
  to?: number
  total?: number
}

export function AuctionsListToolbar({ activeFilters, from, onSortChange, sort, to, total }: AuctionsListToolbarProps) {
  return (
    <header className="grid gap-3 border-b border-slate-800 bg-slate-900/60 px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-[15px] font-bold leading-tight text-slate-100">
            Список аукционов
          </h1>
          <p className="mt-0.5 text-[11px] text-slate-500">
            {total === undefined ? "Загрузка результатов" : `Показано ${from}-${to} из ${total}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-[11px] text-slate-500 sm:inline">Сортировка:</span>
          <NativeSelect
            className="w-[210px]"
            onChange={(event) => onSortChange(event.target.value as AuctionsListSort)}
            value={sort}
          >
            <NativeSelectOption value="stop_time_asc">По времени окончания</NativeSelectOption>
            <NativeSelectOption value="price_desc">По цене убыв.</NativeSelectOption>
            <NativeSelectOption value="price_asc">По цене возр.</NativeSelectOption>
            <NativeSelectOption value="load_date_asc">По дате погрузки</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>

      {activeFilters}
    </header>
  )
}
