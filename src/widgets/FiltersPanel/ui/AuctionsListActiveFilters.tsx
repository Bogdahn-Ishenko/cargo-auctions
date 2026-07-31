import { RiCloseLine } from "@remixicon/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAuctionTypeLabel,
  getTradingStatusLabel,
} from "@/entities/Auction/lib/GetAuctionLabels";
import type { AuctionsListSearch } from "@/features/AuctionFilters/model/AuctionsListSearch.schema";

interface AuctionsListActiveFiltersProps {
  onReset: () => void;
  search: AuctionsListSearch;
}

export function AuctionsListActiveFilters({
  onReset,
  search,
}: AuctionsListActiveFiltersProps) {
  const filters = getActiveFilters(search);

  if (!filters.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => (
        <Badge
          className="border-border bg-muted text-muted-foreground"
          key={filter}
          variant="outline"
        >
          {filter}
        </Badge>
      ))}
      <Button
        className="h-7 border-border bg-muted px-2 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        onClick={onReset}
        type="button"
        variant="outline"
      >
        <RiCloseLine />
        Сбросить
      </Button>
    </div>
  );
}

function getActiveFilters(search: AuctionsListSearch) {
  const filters: string[] = [];

  if (search.cargo_num) filters.push(`Заявка: ${search.cargo_num}`);
  if (search.auc_type !== "all")
    filters.push(`Тип: ${getAuctionTypeLabel(search.auc_type)}`);
  const statuses = search.statuses.length
    ? search.statuses
    : search.status === "all"
      ? []
      : [search.status];
  statuses.forEach((status) => {
    filters.push(`Участие: ${getTradingStatusLabel(status)}`);
  });
  if (search.is_available) filters.push("Только доступные");
  if (search.is_bidder) filters.push("С моим участием");
  if (search.is_favorite) filters.push("Только избранные");
  if (search.load_city) filters.push(`Погрузка: ${search.load_city}`);
  if (search.unload_city) filters.push(`Выгрузка: ${search.unload_city}`);
  if (search.load_date_from)
    filters.push(`Погрузка от ${search.load_date_from}`);
  if (search.load_date_to) filters.push(`Погрузка до ${search.load_date_to}`);
  if (search.unload_date_from)
    filters.push(`Выгрузка от ${search.unload_date_from}`);
  if (search.unload_date_to)
    filters.push(`Выгрузка до ${search.unload_date_to}`);
  if (search.weight_from) filters.push(`Вес от ${search.weight_from} т`);
  if (search.weight_to) filters.push(`Вес до ${search.weight_to} т`);
  if (search.current_price_from)
    filters.push(`Цена от ${search.current_price_from} ₽`);
  if (search.current_price_to)
    filters.push(`Цена до ${search.current_price_to} ₽`);
  if (search.distance_from)
    filters.push(`Дистанция от ${search.distance_from} км`);
  if (search.distance_to) filters.push(`Дистанция до ${search.distance_to} км`);
  if (search.price_per_km_from)
    filters.push(`Цена/км от ${search.price_per_km_from} ₽`);
  if (search.price_per_km_to)
    filters.push(`Цена/км до ${search.price_per_km_to} ₽`);

  return filters;
}
