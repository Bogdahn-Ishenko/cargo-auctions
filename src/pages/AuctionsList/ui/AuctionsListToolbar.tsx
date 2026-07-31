import type { ReactNode } from "react";
import { RiFilter3Line } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeModeSelect } from "@/features/ThemeMode";
import type { AuctionsListSort } from "@/features/AuctionFilters/model/AuctionsListSearch.schema";

interface AuctionsListToolbarProps {
  activeFilters?: ReactNode;
  from?: number;
  isFiltersOpen: boolean;
  onFiltersToggle: () => void;
  onSortChange: (sort: AuctionsListSort) => void;
  sort: AuctionsListSort;
  to?: number;
  total?: number;
}

export function AuctionsListToolbar({
  activeFilters,
  from,
  isFiltersOpen,
  onFiltersToggle,
  onSortChange,
  sort,
  to,
  total,
}: AuctionsListToolbarProps) {
  return (
    <header className="grid gap-3 border-b border-border bg-card px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-[15px] font-bold leading-tight text-foreground">
            Список аукционов
          </h1>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {total === undefined
              ? "Загрузка результатов"
              : `Показано ${from}-${to} из ${total}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            aria-expanded={isFiltersOpen}
            className="border-border bg-card text-foreground hover:bg-muted lg:hidden"
            onClick={onFiltersToggle}
            type="button"
            variant="outline"
          >
            <RiFilter3Line />
            Фильтры
          </Button>
          <span className="hidden text-[11px] text-muted-foreground md:inline">
            Тема:
          </span>
          <ThemeModeSelect />
          <span className="hidden text-[11px] text-muted-foreground sm:inline">
            Сортировка:
          </span>
          <Select
            onValueChange={(value) => onSortChange(value as AuctionsListSort)}
            value={sort}
          >
            <SelectTrigger className="w-[210px] border-border bg-card text-foreground focus-visible:border-ring">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="stop_time_asc">
                По времени окончания
              </SelectItem>
              <SelectItem value="price_desc">По цене убыв.</SelectItem>
              <SelectItem value="price_asc">По цене возр.</SelectItem>
              <SelectItem value="load_date_asc">По дате погрузки</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeFilters}
    </header>
  );
}
