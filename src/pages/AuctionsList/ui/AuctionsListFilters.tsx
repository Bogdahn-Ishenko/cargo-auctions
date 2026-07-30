import { useState } from "react"
import { RiFilter3Line, RiRefreshLine, RiSearchLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import type { AuctionsListTradingStatusSearch, AuctionsListTypeSearch } from "../model/AuctionsListSearch.schema"

interface AuctionsListFiltersProps {
  auctionType: AuctionsListTypeSearch
  cargoNum: string
  isAvailable?: boolean
  onApply: (filters: {
    auctionType: AuctionsListTypeSearch
    cargoNum: string
    isAvailable?: boolean
    pricePerKmFrom: string
    pricePerKmTo: string
    tradingStatus: AuctionsListTradingStatusSearch
    weightFrom: string
    weightTo: string
  }) => void
  onReset: () => void
  pricePerKmFrom: string
  pricePerKmTo: string
  tradingStatus: AuctionsListTradingStatusSearch
  weightFrom: string
  weightTo: string
}

export function AuctionsListFilters({
  auctionType,
  cargoNum,
  isAvailable,
  onApply,
  onReset,
  pricePerKmFrom,
  pricePerKmTo,
  tradingStatus,
  weightFrom,
  weightTo,
}: AuctionsListFiltersProps) {
  const [draftAuctionType, setDraftAuctionType] = useState<AuctionsListTypeSearch>(auctionType)
  const [draftCargoNum, setDraftCargoNum] = useState(cargoNum)
  const [draftIsAvailable, setDraftIsAvailable] = useState(isAvailable ?? false)
  const [draftPricePerKmFrom, setDraftPricePerKmFrom] = useState(pricePerKmFrom)
  const [draftPricePerKmTo, setDraftPricePerKmTo] = useState(pricePerKmTo)
  const [draftTradingStatus, setDraftTradingStatus] = useState<AuctionsListTradingStatusSearch>(tradingStatus)
  const [draftWeightFrom, setDraftWeightFrom] = useState(weightFrom)
  const [draftWeightTo, setDraftWeightTo] = useState(weightTo)

  return (
    <form
      className="flex flex-col gap-5 border-b border-slate-800 bg-slate-950 p-4 text-slate-200 lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r"
      onSubmit={(event) => {
        event.preventDefault()
        onApply({
          auctionType: draftAuctionType,
          cargoNum: draftCargoNum.trim(),
          isAvailable: draftIsAvailable ? true : undefined,
          pricePerKmFrom: draftPricePerKmFrom.trim(),
          pricePerKmTo: draftPricePerKmTo.trim(),
          tradingStatus: draftTradingStatus,
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
          className="border-slate-600"
          id="is-available"
          checked={draftIsAvailable}
          onCheckedChange={(value) => setDraftIsAvailable(value === true)}
        />
        <Label className="text-xs text-slate-300" htmlFor="is-available">
          Только доступные
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
            setDraftIsAvailable(false)
            setDraftPricePerKmFrom("")
            setDraftPricePerKmTo("")
            setDraftTradingStatus("all")
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
