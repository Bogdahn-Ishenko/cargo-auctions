import { useState } from "react"
import { RiFilter3Line, RiRefreshLine, RiSearchLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AuctionsListFiltersProps {
  cargoNum: string
  isAvailable?: boolean
  onApply: (filters: { cargoNum: string; isAvailable?: boolean }) => void
  onReset: () => void
}

export function AuctionsListFilters({ cargoNum, isAvailable, onApply, onReset }: AuctionsListFiltersProps) {
  const [draftCargoNum, setDraftCargoNum] = useState(cargoNum)
  const [draftIsAvailable, setDraftIsAvailable] = useState(isAvailable ?? false)

  return (
    <form
      className="flex flex-col gap-5 border-b border-slate-800 bg-slate-950 p-4 text-slate-200 lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r"
      onSubmit={(event) => {
        event.preventDefault()
        onApply({
          cargoNum: draftCargoNum.trim(),
          isAvailable: draftIsAvailable ? true : undefined,
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
            setDraftCargoNum("")
            setDraftIsAvailable(false)
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
