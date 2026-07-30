import { useState } from "react"
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
      className="grid gap-3 rounded-xl border bg-card p-4 text-card-foreground sm:grid-cols-[1fr_auto_auto]"
      onSubmit={(event) => {
        event.preventDefault()
        onApply({
          cargoNum: draftCargoNum.trim(),
          isAvailable: draftIsAvailable ? true : undefined,
        })
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="cargo-num">Номер заявки</Label>
        <Input
          id="cargo-num"
          value={draftCargoNum}
          placeholder="00000001059"
          onChange={(event) => setDraftCargoNum(event.target.value)}
        />
      </div>

      <div className="flex items-end gap-2 pb-2">
        <Checkbox
          id="is-available"
          checked={draftIsAvailable}
          onCheckedChange={(value) => setDraftIsAvailable(value === true)}
        />
        <Label htmlFor="is-available">Доступные</Label>
      </div>

      <div className="flex items-end gap-2">
        <Button type="submit">Применить</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setDraftCargoNum("")
            setDraftIsAvailable(false)
            onReset()
          }}
        >
          Сбросить
        </Button>
      </div>
    </form>
  )
}
