import { useState } from "react";
import { ru } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { RiFilter3Line, RiRefreshLine, RiSearchLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auctionCityOptions } from "../model/AuctionCityOptions";
import type {
  AuctionsListTradingStatusSearch,
  AuctionsListTypeSearch,
} from "@/features/AuctionFilters/model/AuctionsListSearch.schema";

const allCitySelectValue = "__all__";
const labelClassName =
  "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground";
const dateInputClassName =
  "date-input-dark h-8 min-w-0 border-border bg-card px-1.5 text-[10px] font-normal leading-none text-foreground focus-visible:border-ring";
const filterSelectTriggerClassName =
  "w-full border-border bg-card text-foreground focus-visible:border-ring";
const numberInputClassName =
  "border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring";
const checkboxClassName = "border-border";

interface AuctionsListFiltersProps {
  auctionType: AuctionsListTypeSearch;
  cargoNum: string;
  currentPriceFrom: string;
  currentPriceTo: string;
  isAvailable?: boolean;
  isBidder?: boolean;
  isOpen: boolean;
  onApply: (filters: {
    auctionType: AuctionsListTypeSearch;
    cargoNum: string;
    currentPriceFrom: string;
    currentPriceTo: string;
    isAvailable?: boolean;
    isBidder?: boolean;
    isFavorite?: boolean;
    loadCity: string;
    loadDateFrom: string;
    loadDateTo: string;
    pricePerKmFrom: string;
    pricePerKmTo: string;
    tradingStatus: AuctionsListTradingStatusSearch;
    unloadCity: string;
    unloadDateFrom: string;
    unloadDateTo: string;
    weightFrom: string;
    weightTo: string;
  }) => void;
  onReset: () => void;
  isFavorite?: boolean;
  loadCity: string;
  loadDateFrom: string;
  loadDateTo: string;
  pricePerKmFrom: string;
  pricePerKmTo: string;
  tradingStatus: AuctionsListTradingStatusSearch;
  unloadCity: string;
  unloadDateFrom: string;
  unloadDateTo: string;
  weightFrom: string;
  weightTo: string;
}

export function AuctionsListFilters({
  auctionType,
  cargoNum,
  currentPriceFrom,
  currentPriceTo,
  isAvailable,
  isBidder,
  isFavorite,
  isOpen,
  loadCity,
  loadDateFrom,
  loadDateTo,
  onApply,
  onReset,
  pricePerKmFrom,
  pricePerKmTo,
  tradingStatus,
  unloadCity,
  unloadDateFrom,
  unloadDateTo,
  weightFrom,
  weightTo,
}: AuctionsListFiltersProps) {
  const [draftAuctionType, setDraftAuctionType] =
    useState<AuctionsListTypeSearch>(auctionType);
  const [draftCargoNum, setDraftCargoNum] = useState(cargoNum);
  const [draftCurrentPriceFrom, setDraftCurrentPriceFrom] =
    useState(currentPriceFrom);
  const [draftCurrentPriceTo, setDraftCurrentPriceTo] =
    useState(currentPriceTo);
  const [draftIsAvailable, setDraftIsAvailable] = useState(
    isAvailable ?? false,
  );
  const [draftIsBidder, setDraftIsBidder] = useState(isBidder ?? false);
  const [draftIsFavorite, setDraftIsFavorite] = useState(isFavorite ?? false);
  const [draftLoadCity, setDraftLoadCity] = useState(loadCity);
  const [draftLoadDateFrom, setDraftLoadDateFrom] = useState(loadDateFrom);
  const [draftLoadDateTo, setDraftLoadDateTo] = useState(loadDateTo);
  const [draftPricePerKmFrom, setDraftPricePerKmFrom] =
    useState(pricePerKmFrom);
  const [draftPricePerKmTo, setDraftPricePerKmTo] = useState(pricePerKmTo);
  const [draftTradingStatus, setDraftTradingStatus] =
    useState<AuctionsListTradingStatusSearch>(tradingStatus);
  const [draftUnloadCity, setDraftUnloadCity] = useState(unloadCity);
  const [draftUnloadDateFrom, setDraftUnloadDateFrom] =
    useState(unloadDateFrom);
  const [draftUnloadDateTo, setDraftUnloadDateTo] = useState(unloadDateTo);
  const [draftWeightFrom, setDraftWeightFrom] = useState(weightFrom);
  const [draftWeightTo, setDraftWeightTo] = useState(weightTo);
  const loadDateRange = getDateRange(draftLoadDateFrom, draftLoadDateTo);

  function resetDraftFilters() {
    setDraftAuctionType("all");
    setDraftCargoNum("");
    setDraftCurrentPriceFrom("");
    setDraftCurrentPriceTo("");
    setDraftIsAvailable(false);
    setDraftIsBidder(false);
    setDraftIsFavorite(false);
    setDraftLoadCity("");
    setDraftLoadDateFrom("");
    setDraftLoadDateTo("");
    setDraftPricePerKmFrom("");
    setDraftPricePerKmTo("");
    setDraftTradingStatus("all");
    setDraftUnloadCity("");
    setDraftUnloadDateFrom("");
    setDraftUnloadDateTo("");
    setDraftWeightFrom("");
    setDraftWeightTo("");
    onReset();
  }

  function selectLoadDateRange(range: DateRange | undefined) {
    setDraftLoadDateFrom(toDateInputValue(range?.from));
    setDraftLoadDateTo(toDateInputValue(range?.to));
  }

  return (
    <form
      className={`${isOpen ? "flex" : "hidden"} h-screen max-h-screen flex-col overflow-hidden border-b border-border bg-sidebar text-sidebar-foreground lg:flex lg:w-[328px] lg:shrink-0 lg:border-b-0 lg:border-r`}
      onSubmit={(event) => {
        event.preventDefault();
        onApply({
          auctionType: draftAuctionType,
          cargoNum: draftCargoNum.trim(),
          currentPriceFrom: draftCurrentPriceFrom.trim(),
          currentPriceTo: draftCurrentPriceTo.trim(),
          isAvailable: draftIsAvailable ? true : undefined,
          isBidder: draftIsBidder ? true : undefined,
          isFavorite: draftIsFavorite ? true : undefined,
          loadCity: draftLoadCity,
          loadDateFrom: draftLoadDateFrom,
          loadDateTo: draftLoadDateTo,
          pricePerKmFrom: draftPricePerKmFrom.trim(),
          pricePerKmTo: draftPricePerKmTo.trim(),
          tradingStatus: draftTradingStatus,
          unloadCity: draftUnloadCity,
          unloadDateFrom: draftUnloadDateFrom,
          unloadDateTo: draftUnloadDateTo,
          weightFrom: draftWeightFrom.trim(),
          weightTo: draftWeightTo.trim(),
        });
      }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-sidebar-border bg-sidebar px-5 py-4">
        <div className="flex items-center gap-2">
          <RiFilter3Line className="size-4 text-muted-foreground" />
          <div className={labelClassName}>Фильтры</div>
        </div>
        <button
          className="text-[11px] font-medium text-primary transition-colors hover:text-primary/80"
          onClick={resetDraftFilters}
          type="button"
        >
          Сбросить
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-5">
        <div className="grid gap-2">
          <Label className={labelClassName} htmlFor="cargo-num">
            Номер заявки
          </Label>
          <div className="relative">
            <RiSearchLine className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="border-border bg-card pl-8 font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring"
              id="cargo-num"
              onChange={(event) => setDraftCargoNum(event.target.value)}
              placeholder="00000001059"
              value={draftCargoNum}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label className={labelClassName}>Текущая цена, ₽</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              className={numberInputClassName}
              inputMode="decimal"
              min={0}
              onChange={(event) => setDraftCurrentPriceFrom(event.target.value)}
              placeholder="От"
              type="number"
              value={draftCurrentPriceFrom}
            />
            <Input
              className={numberInputClassName}
              inputMode="decimal"
              min={0}
              onChange={(event) => setDraftCurrentPriceTo(event.target.value)}
              placeholder="До"
              type="number"
              value={draftCurrentPriceTo}
            />
          </div>
        </div>

        <div className="grid gap-3">
          <Label className={labelClassName}>Даты</Label>
          <div className="grid gap-2 rounded-xl border border-border bg-card p-2">
            <div className="grid gap-1.5">
              <div className="text-xs font-medium text-muted-foreground">
                Погрузка
              </div>
              <div className="grid min-w-0 grid-cols-2 gap-1.5">
                <Input
                  className={dateInputClassName}
                  onChange={(event) => setDraftLoadDateFrom(event.target.value)}
                  type="date"
                  value={draftLoadDateFrom}
                />
                <Input
                  className={dateInputClassName}
                  onChange={(event) => setDraftLoadDateTo(event.target.value)}
                  type="date"
                  value={draftLoadDateTo}
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <div className="text-xs font-medium text-muted-foreground">
                Выгрузка
              </div>
              <div className="grid min-w-0 grid-cols-2 gap-1.5">
                <Input
                  className={dateInputClassName}
                  onChange={(event) =>
                    setDraftUnloadDateFrom(event.target.value)
                  }
                  type="date"
                  value={draftUnloadDateFrom}
                />
                <Input
                  className={dateInputClassName}
                  onChange={(event) => setDraftUnloadDateTo(event.target.value)}
                  type="date"
                  value={draftUnloadDateTo}
                />
              </div>
            </div>
          </div>
          <Calendar
            buttonVariant="ghost"
            className="w-full rounded-xl border border-border bg-card p-2 text-foreground [--cell-size:--spacing(6)] [&_.rdp-button_next]:text-muted-foreground [&_.rdp-button_next]:hover:bg-muted [&_.rdp-button_next]:hover:text-foreground [&_.rdp-button_previous]:text-muted-foreground [&_.rdp-button_previous]:hover:bg-muted [&_.rdp-button_previous]:hover:text-foreground [&_.rdp-nav]:z-10"
            classNames={{
              caption_label: "text-[11px] font-semibold text-foreground",
              day_button:
                "text-[10px] text-foreground hover:bg-muted hover:text-foreground",
              month: "flex w-full flex-col gap-2",
              month_grid: "w-full",
              months: "relative flex w-full flex-col gap-4",
              outside: "text-muted-foreground/50",
              range_end: "bg-primary text-primary-foreground",
              range_middle: "bg-primary/20 text-primary",
              range_start: "bg-primary text-primary-foreground",
              selected: "bg-primary text-primary-foreground",
              today: "bg-muted text-foreground",
              week: "mt-1 flex w-full",
              weekdays: "flex w-full",
              weekday:
                "flex h-(--cell-size) flex-1 items-center justify-center text-[9px] text-muted-foreground",
              root: "w-full",
            }}
            locale={ru}
            mode="range"
            onSelect={selectLoadDateRange}
            selected={loadDateRange}
            showOutsideDays={false}
          />
        </div>

        <div className="grid gap-2">
          <Label className={labelClassName} htmlFor="auction-type">
            Тип аукциона
          </Label>
          <Select
            onValueChange={(value) =>
              setDraftAuctionType(value as AuctionsListTypeSearch)
            }
            value={draftAuctionType}
          >
            <SelectTrigger
              className={filterSelectTriggerClassName}
              id="auction-type"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="all">Любой тип</SelectItem>
              <SelectItem value="Request">Заявка</SelectItem>
              <SelectItem value="Up">Повышение</SelectItem>
              <SelectItem value="Down">Понижение</SelectItem>
              <SelectItem value="FixPrice">Фикс</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label className={labelClassName} htmlFor="trading-status">
            Участие
          </Label>
          <Select
            onValueChange={(value) =>
              setDraftTradingStatus(value as AuctionsListTradingStatusSearch)
            }
            value={draftTradingStatus}
          >
            <SelectTrigger
              className={filterSelectTriggerClassName}
              id="trading-status"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="all">Любой статус</SelectItem>
              <SelectItem value="NotParticipating">Не участвуете</SelectItem>
              <SelectItem value="Leading">Вы лидируете</SelectItem>
              <SelectItem value="Losing">Вас обогнали</SelectItem>
              <SelectItem value="Confirmed">Подтверждено</SelectItem>
              <SelectItem value="ChoosingWinner">Выбор победителя</SelectItem>
              <SelectItem value="Winner">Победа</SelectItem>
              <SelectItem value="Unknown">Без участия</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label className={labelClassName} htmlFor="load-city">
            Город погрузки
          </Label>
          <Select
            onValueChange={(value) =>
              setDraftLoadCity(value === allCitySelectValue ? "" : value)
            }
            value={draftLoadCity || allCitySelectValue}
          >
            <SelectTrigger
              className={filterSelectTriggerClassName}
              id="load-city"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value={allCitySelectValue}>Любой город</SelectItem>
              {auctionCityOptions.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label className={labelClassName} htmlFor="unload-city">
            Город выгрузки
          </Label>
          <Select
            onValueChange={(value) =>
              setDraftUnloadCity(value === allCitySelectValue ? "" : value)
            }
            value={draftUnloadCity || allCitySelectValue}
          >
            <SelectTrigger
              className={filterSelectTriggerClassName}
              id="unload-city"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value={allCitySelectValue}>Любой город</SelectItem>
              {auctionCityOptions.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label className={labelClassName}>Вес, т</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              className={numberInputClassName}
              inputMode="decimal"
              min={0}
              onChange={(event) => setDraftWeightFrom(event.target.value)}
              placeholder="От"
              type="number"
              value={draftWeightFrom}
            />
            <Input
              className={numberInputClassName}
              inputMode="decimal"
              min={0}
              onChange={(event) => setDraftWeightTo(event.target.value)}
              placeholder="До"
              type="number"
              value={draftWeightTo}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label className={labelClassName}>Цена за км, ₽</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              className={numberInputClassName}
              inputMode="decimal"
              min={0}
              onChange={(event) => setDraftPricePerKmFrom(event.target.value)}
              placeholder="От"
              type="number"
              value={draftPricePerKmFrom}
            />
            <Input
              className={numberInputClassName}
              inputMode="decimal"
              min={0}
              onChange={(event) => setDraftPricePerKmTo(event.target.value)}
              placeholder="До"
              type="number"
              value={draftPricePerKmTo}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={draftIsBidder}
            className={checkboxClassName}
            id="is-bidder"
            onCheckedChange={(value) => setDraftIsBidder(value === true)}
          />
          <Label className="text-xs text-foreground" htmlFor="is-bidder">
            Только с моим участием
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            className={checkboxClassName}
            id="is-available"
            checked={draftIsAvailable}
            onCheckedChange={(value) => setDraftIsAvailable(value === true)}
          />
          <Label className="text-xs text-foreground" htmlFor="is-available">
            Только доступные
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            className={checkboxClassName}
            id="is-favorite"
            checked={draftIsFavorite}
            onCheckedChange={(value) => setDraftIsFavorite(value === true)}
          />
          <Label className="text-xs text-foreground" htmlFor="is-favorite">
            Только избранные
          </Label>
        </div>

        <div className="border-t border-border/80" />
      </div>

      <div className="grid gap-2 border-t border-sidebar-border bg-sidebar p-4">
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          type="submit"
        >
          Применить фильтры
        </Button>
        <Button
          className="w-full border-border bg-card text-foreground hover:bg-muted"
          type="button"
          variant="outline"
          onClick={resetDraftFilters}
        >
          <RiRefreshLine />
          Сбросить
        </Button>
      </div>
    </form>
  );
}

function getDateRange(from: string, to: string): DateRange | undefined {
  const fromDate = parseDateInputValue(from);
  const toDate = parseDateInputValue(to);

  if (!fromDate && !toDate) return undefined;

  return {
    from: fromDate,
    to: toDate,
  };
}

function parseDateInputValue(value: string) {
  if (!value) return undefined;

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;

  return new Date(year, month - 1, day);
}

function toDateInputValue(date: Date | undefined) {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
