import type { ReactNode } from "react";
import { RiFilter3Line, RiSortAsc } from "@remixicon/react";
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

        <div className="sidebar-scrollbar -mx-1 flex max-w-full items-center gap-2 overflow-x-auto px-1 pb-1 whitespace-nowrap sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
          <Button
            aria-expanded={isFiltersOpen}
            aria-label="Фильтры"
            className="h-8 w-10 shrink-0 border-border bg-card px-0 text-foreground hover:bg-muted sm:w-auto sm:px-3 lg:hidden"
            onClick={onFiltersToggle}
            type="button"
            variant="outline"
          >
            <RiFilter3Line />
            <span className="hidden sm:inline">Фильтры</span>
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
            <SelectTrigger
              aria-label="Сортировка"
              className="w-[168px] shrink-0 border-border bg-card text-foreground focus-visible:border-ring sm:w-[210px]"
            >
              <RiSortAsc className="size-4 text-muted-foreground sm:hidden" />
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
