import { useState } from "react"
import { ru } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import { RiFilter3Line, RiRefreshLine, RiSearchLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { auctionCityOptions } from "../model/AuctionCityOptions"
import type { AuctionsListTradingStatusSearch, AuctionsListTypeSearch } from "../model/AuctionsListSearch.schema"

interface AuctionsListFiltersProps {
  auctionType: AuctionsListTypeSearch
  cargoNum: string
  currentPriceFrom: string
  currentPriceTo: string
  isAvailable?: boolean
  isBidder?: boolean
  isOpen: boolean
  onApply: (filters: {
    auctionType: AuctionsListTypeSearch
    cargoNum: string
    currentPriceFrom: string
    currentPriceTo: string
    isAvailable?: boolean
    isBidder?: boolean
    isFavorite?: boolean
    loadCity: string
    loadDateFrom: string
    loadDateTo: string
    pricePerKmFrom: string
    pricePerKmTo: string
    tradingStatus: AuctionsListTradingStatusSearch
    unloadCity: string
    unloadDateFrom: string
    unloadDateTo: string
    weightFrom: string
    weightTo: string
  }) => void
  onReset: () => void
  isFavorite?: boolean
  loadCity: string
  loadDateFrom: string
  loadDateTo: string
  pricePerKmFrom: string
  pricePerKmTo: string
  tradingStatus: AuctionsListTradingStatusSearch
  unloadCity: string
  unloadDateFrom: string
  unloadDateTo: string
  weightFrom: string
  weightTo: string
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
  const [draftAuctionType, setDraftAuctionType] = useState<AuctionsListTypeSearch>(auctionType)
  const [draftCargoNum, setDraftCargoNum] = useState(cargoNum)
  const [draftCurrentPriceFrom, setDraftCurrentPriceFrom] = useState(currentPriceFrom)
  const [draftCurrentPriceTo, setDraftCurrentPriceTo] = useState(currentPriceTo)
  const [draftIsAvailable, setDraftIsAvailable] = useState(isAvailable ?? false)
  const [draftIsBidder, setDraftIsBidder] = useState(isBidder ?? false)
  const [draftIsFavorite, setDraftIsFavorite] = useState(isFavorite ?? false)
  const [draftLoadCity, setDraftLoadCity] = useState(loadCity)
  const [draftLoadDateFrom, setDraftLoadDateFrom] = useState(loadDateFrom)
  const [draftLoadDateTo, setDraftLoadDateTo] = useState(loadDateTo)
  const [draftPricePerKmFrom, setDraftPricePerKmFrom] = useState(pricePerKmFrom)
  const [draftPricePerKmTo, setDraftPricePerKmTo] = useState(pricePerKmTo)
  const [draftTradingStatus, setDraftTradingStatus] = useState<AuctionsListTradingStatusSearch>(tradingStatus)
  const [draftUnloadCity, setDraftUnloadCity] = useState(unloadCity)
  const [draftUnloadDateFrom, setDraftUnloadDateFrom] = useState(unloadDateFrom)
  const [draftUnloadDateTo, setDraftUnloadDateTo] = useState(unloadDateTo)
  const [draftWeightFrom, setDraftWeightFrom] = useState(weightFrom)
  const [draftWeightTo, setDraftWeightTo] = useState(weightTo)
  const loadDateRange = getDateRange(draftLoadDateFrom, draftLoadDateTo)

  function resetDraftFilters() {
    setDraftAuctionType("all")
    setDraftCargoNum("")
    setDraftCurrentPriceFrom("")
    setDraftCurrentPriceTo("")
    setDraftIsAvailable(false)
    setDraftIsBidder(false)
    setDraftIsFavorite(false)
    setDraftLoadCity("")
    setDraftLoadDateFrom("")
    setDraftLoadDateTo("")
    setDraftPricePerKmFrom("")
    setDraftPricePerKmTo("")
    setDraftTradingStatus("all")
    setDraftUnloadCity("")
    setDraftUnloadDateFrom("")
    setDraftUnloadDateTo("")
    setDraftWeightFrom("")
    setDraftWeightTo("")
    onReset()
  }

  function selectLoadDateRange(range: DateRange | undefined) {
    setDraftLoadDateFrom(toDateInputValue(range?.from))
    setDraftLoadDateTo(toDateInputValue(range?.to))
  }

  return (
    <form
      className={`${isOpen ? "flex" : "hidden"} h-screen max-h-screen flex-col overflow-hidden border-b border-slate-800 bg-slate-900 text-slate-200 lg:flex lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r`}
      onSubmit={(event) => {
        event.preventDefault()
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
        })
      }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 px-5 py-4">
        <div className="flex items-center gap-2">
          <RiFilter3Line className="size-4 text-slate-500" />
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Фильтры</div>
        </div>
        <button
          className="text-[11px] font-medium text-blue-400 transition-colors hover:text-blue-300"
          onClick={resetDraftFilters}
          type="button"
        >
          Сбросить
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-5">
      <div className="grid gap-2">
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500" htmlFor="cargo-num">
          Номер заявки
        </Label>
        <div className="relative">
          <RiSearchLine className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <Input
            className="border-slate-700 bg-slate-800 pl-8 font-mono text-sm text-slate-100 placeholder:text-slate-600 focus-visible:border-blue-500"
            id="cargo-num"
            onChange={(event) => setDraftCargoNum(event.target.value)}
            placeholder="00000001059"
            value={draftCargoNum}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Текущая цена, ₽</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            className="border-slate-700 bg-slate-900 text-sm text-slate-100 placeholder:text-slate-600 focus-visible:border-blue-500"
            inputMode="decimal"
            min={0}
            onChange={(event) => setDraftCurrentPriceFrom(event.target.value)}
            placeholder="От"
            type="number"
            value={draftCurrentPriceFrom}
          />
          <Input
            className="border-slate-700 bg-slate-900 text-sm text-slate-100 placeholder:text-slate-600 focus-visible:border-blue-500"
            inputMode="decimal"
            min={0}
            onChange={(event) => setDraftCurrentPriceTo(event.target.value)}
            placeholder="До"
            type="number"
            value={draftCurrentPriceTo}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Дата погрузки</Label>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <Input
            className="min-w-0 border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100 focus-visible:border-blue-500"
            onChange={(event) => setDraftLoadDateFrom(event.target.value)}
            type="date"
            value={draftLoadDateFrom}
          />
          <Input
            className="min-w-0 border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100 focus-visible:border-blue-500"
            onChange={(event) => setDraftLoadDateTo(event.target.value)}
            type="date"
            value={draftLoadDateTo}
          />
        </div>
        <Calendar
          buttonVariant="ghost"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-300 [--cell-size:--spacing(6)]"
          classNames={{
            caption_label: "text-[11px] font-semibold text-slate-300",
            day_button: "text-[10px] text-slate-300 hover:bg-slate-700 hover:text-slate-100",
            month: "w-full gap-2",
            month_grid: "w-full",
            months: "w-full",
            nav: "text-slate-400",
            outside: "text-slate-600",
            range_end: "bg-blue-600 text-white",
            range_middle: "bg-blue-600/20 text-blue-200",
            range_start: "bg-blue-600 text-white",
            selected: "bg-blue-600 text-white",
            today: "bg-slate-700 text-slate-100",
            weekday: "text-[9px] text-slate-600",
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
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500" htmlFor="auction-type">
          Тип аукциона
        </Label>
        <NativeSelect
          className="w-full"
          id="auction-type"
          onChange={(event) => setDraftAuctionType(event.target.value as AuctionsListTypeSearch)}
          value={draftAuctionType}
        >
          <NativeSelectOption value="all">Любой тип</NativeSelectOption>
          <NativeSelectOption value="Request">Заявка</NativeSelectOption>
          <NativeSelectOption value="Up">Повышение</NativeSelectOption>
          <NativeSelectOption value="Down">Понижение</NativeSelectOption>
          <NativeSelectOption value="FixPrice">Фикс</NativeSelectOption>
        </NativeSelect>
      </div>

      <div className="grid gap-2">
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500" htmlFor="trading-status">
          Участие
        </Label>
        <NativeSelect
          className="w-full"
          id="trading-status"
          onChange={(event) => setDraftTradingStatus(event.target.value as AuctionsListTradingStatusSearch)}
          value={draftTradingStatus}
        >
          <NativeSelectOption value="all">Любой статус</NativeSelectOption>
          <NativeSelectOption value="NotParticipating">Не участвуете</NativeSelectOption>
          <NativeSelectOption value="Leading">Вы лидируете</NativeSelectOption>
          <NativeSelectOption value="Losing">Вас обогнали</NativeSelectOption>
          <NativeSelectOption value="Confirmed">Подтверждено</NativeSelectOption>
          <NativeSelectOption value="ChoosingWinner">Выбор победителя</NativeSelectOption>
          <NativeSelectOption value="Winner">Победа</NativeSelectOption>
          <NativeSelectOption value="Unknown">Без участия</NativeSelectOption>
        </NativeSelect>
      </div>

      <div className="grid gap-2">
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500" htmlFor="load-city">
          Город погрузки
        </Label>
        <NativeSelect
          className="w-full"
          id="load-city"
          onChange={(event) => setDraftLoadCity(event.target.value)}
          value={draftLoadCity}
        >
          <NativeSelectOption value="">Любой город</NativeSelectOption>
          {auctionCityOptions.map((city) => (
            <NativeSelectOption key={city} value={city}>
              {city}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className="grid gap-2">
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500" htmlFor="unload-city">
          Город выгрузки
        </Label>
        <NativeSelect
          className="w-full"
          id="unload-city"
          onChange={(event) => setDraftUnloadCity(event.target.value)}
          value={draftUnloadCity}
        >
          <NativeSelectOption value="">Любой город</NativeSelectOption>
          {auctionCityOptions.map((city) => (
            <NativeSelectOption key={city} value={city}>
              {city}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className="grid gap-2">
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Дата выгрузки</Label>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <Input
            className="min-w-0 border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100 focus-visible:border-blue-500"
            onChange={(event) => setDraftUnloadDateFrom(event.target.value)}
            type="date"
            value={draftUnloadDateFrom}
          />
          <Input
            className="min-w-0 border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100 focus-visible:border-blue-500"
            onChange={(event) => setDraftUnloadDateTo(event.target.value)}
            type="date"
            value={draftUnloadDateTo}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Вес, т</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            className="border-slate-700 bg-slate-900 text-sm text-slate-100 placeholder:text-slate-600 focus-visible:border-blue-500"
            inputMode="decimal"
            min={0}
            onChange={(event) => setDraftWeightFrom(event.target.value)}
            placeholder="От"
            type="number"
            value={draftWeightFrom}
          />
          <Input
            className="border-slate-700 bg-slate-900 text-sm text-slate-100 placeholder:text-slate-600 focus-visible:border-blue-500"
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
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Цена за км, ₽</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            className="border-slate-700 bg-slate-900 text-sm text-slate-100 placeholder:text-slate-600 focus-visible:border-blue-500"
            inputMode="decimal"
            min={0}
            onChange={(event) => setDraftPricePerKmFrom(event.target.value)}
            placeholder="От"
            type="number"
            value={draftPricePerKmFrom}
          />
          <Input
            className="border-slate-700 bg-slate-900 text-sm text-slate-100 placeholder:text-slate-600 focus-visible:border-blue-500"
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
          className="border-slate-600"
          id="is-bidder"
          onCheckedChange={(value) => setDraftIsBidder(value === true)}
        />
        <Label className="text-xs text-slate-300" htmlFor="is-bidder">
          Только с моим участием
        </Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          className="border-slate-600"
          id="is-available"
          checked={draftIsAvailable}
          onCheckedChange={(value) => setDraftIsAvailable(value === true)}
        />
        <Label className="text-xs text-slate-300" htmlFor="is-available">
          Только доступные
        </Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          className="border-slate-600"
          id="is-favorite"
          checked={draftIsFavorite}
          onCheckedChange={(value) => setDraftIsFavorite(value === true)}
        />
        <Label className="text-xs text-slate-300" htmlFor="is-favorite">
          Только избранные
        </Label>
      </div>

      <div className="border-t border-slate-800/80" />
      </div>

      <div className="grid gap-2 border-t border-slate-800 bg-slate-900 p-4">
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" type="submit">
          Применить фильтры
        </Button>
        <Button
          className="w-full border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
          type="button"
          variant="outline"
          onClick={resetDraftFilters}
        >
          <RiRefreshLine />
          Сбросить
        </Button>
      </div>
    </form>
  )
}

function getDateRange(from: string, to: string): DateRange | undefined {
  const fromDate = parseDateInputValue(from)
  const toDate = parseDateInputValue(to)

  if (!fromDate && !toDate) return undefined

  return {
    from: fromDate,
    to: toDate,
  }
}

function parseDateInputValue(value: string) {
  if (!value) return undefined

  const [year, month, day] = value.split("-").map(Number)
  if (!year || !month || !day) return undefined

  return new Date(year, month - 1, day)
}

function toDateInputValue(date: Date | undefined) {
  if (!date) return ""

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}
