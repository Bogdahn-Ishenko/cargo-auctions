import { useState } from "react"
import { RiFilter3Line, RiRefreshLine, RiSearchLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
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

  return (
    <form
      className={`${isOpen ? "flex" : "hidden"} flex-col gap-5 border-b border-slate-800 bg-slate-950 p-4 text-slate-200 lg:flex lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r`}
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
      <div className="flex items-center gap-2">
        <RiFilter3Line className="size-4 text-slate-500" />
        <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Фильтры</div>
      </div>

      <div className="grid gap-2">
        <Label className="text-xs text-slate-400" htmlFor="cargo-num">
          Номер заявки
        </Label>
        <div className="relative">
          <RiSearchLine className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
        <Input
          className="border-slate-700 bg-slate-900 pl-8 text-sm text-slate-100 placeholder:text-slate-600 focus-visible:border-blue-500"
          id="cargo-num"
          value={draftCargoNum}
          placeholder="00000001059"
          onChange={(event) => setDraftCargoNum(event.target.value)}
        />
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="text-xs text-slate-400" htmlFor="auction-type">
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
        <Label className="text-xs text-slate-400" htmlFor="trading-status">
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
        <Label className="text-xs text-slate-400" htmlFor="load-city">
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
        <Label className="text-xs text-slate-400" htmlFor="unload-city">
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
        <Label className="text-xs text-slate-400">Дата погрузки</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            className="border-slate-700 bg-slate-900 text-sm text-slate-100 focus-visible:border-blue-500"
            onChange={(event) => setDraftLoadDateFrom(event.target.value)}
            type="date"
            value={draftLoadDateFrom}
          />
          <Input
            className="border-slate-700 bg-slate-900 text-sm text-slate-100 focus-visible:border-blue-500"
            onChange={(event) => setDraftLoadDateTo(event.target.value)}
            type="date"
            value={draftLoadDateTo}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="text-xs text-slate-400">Дата выгрузки</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            className="border-slate-700 bg-slate-900 text-sm text-slate-100 focus-visible:border-blue-500"
            onChange={(event) => setDraftUnloadDateFrom(event.target.value)}
            type="date"
            value={draftUnloadDateFrom}
          />
          <Input
            className="border-slate-700 bg-slate-900 text-sm text-slate-100 focus-visible:border-blue-500"
            onChange={(event) => setDraftUnloadDateTo(event.target.value)}
            type="date"
            value={draftUnloadDateTo}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="text-xs text-slate-400">Вес, т</Label>
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
        <Label className="text-xs text-slate-400">Текущая цена, ₽</Label>
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
        <Label className="text-xs text-slate-400">Цена за км, ₽</Label>
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

      <div className="mt-auto grid gap-2">
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" type="submit">
          Применить
        </Button>
        <Button
          className="w-full border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
          type="button"
          variant="outline"
          onClick={() => {
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
          }}
        >
          <RiRefreshLine />
          Сбросить
        </Button>
      </div>
    </form>
  )
}
