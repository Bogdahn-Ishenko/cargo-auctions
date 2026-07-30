import type { FormEvent } from "react"
import { useState } from "react"
import { RiSendPlaneLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSetAuctionBet } from "@/entities/Auction/api/UseSetAuctionBet"
import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types"
import { formatPrice } from "@/shared/lib/FormatPrice"

interface AuctionBetFormProps {
  auction: AuctionDetailResponse
}

export function AuctionBetForm({ auction }: AuctionBetFormProps) {
  const [price, setPrice] = useState(getInitialBidValue(auction))
  const [error, setError] = useState("")
  const mutation = useSetAuctionBet(auction.main.order_uid)
  const isDisabled = !auction.trading.can_set_bet || mutation.isPending

  function submitBet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsedPrice = Number(price)
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setError("Укажите сумму больше 0")
      return
    }

    setError("")
    mutation.mutate(parsedPrice)
  }

  return (
    <form className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4" onSubmit={submitBet}>
      <div className="grid gap-2">
        <Label className="text-[10px] font-medium uppercase tracking-widest text-slate-500" htmlFor="bet-price">
          Ваша ставка
        </Label>
        <Input
          className="h-11 border-slate-700 bg-slate-950 text-center font-mono text-lg font-bold text-white focus-visible:border-blue-500"
          disabled={isDisabled}
          id="bet-price"
          inputMode="numeric"
          min={1}
          onChange={(event) => setPrice(event.target.value)}
          type="number"
          value={price}
        />
      </div>

      <div className="min-h-4 text-center text-[11px] text-slate-500">
        {error ? error : mutation.isError ? "Не удалось отправить ставку" : `Будет отправлено: ${formatPrice(Number(price) || null)}`}
      </div>

      <Button className="h-10 w-full bg-blue-600 text-white hover:bg-blue-700" disabled={isDisabled} type="submit">
        <RiSendPlaneLine />
        {mutation.isPending ? "Отправка" : auction.trading.can_set_bet ? "Сделать ставку" : "Ставка недоступна"}
      </Button>
    </form>
  )
}

function getInitialBidValue(auction: AuctionDetailResponse) {
  const price = auction.trading.price
  const current = price?.current
  const step = price?.step ?? 0

  if (!current) return ""

  if (auction.main.auc_type === "Down") {
    return String(Math.max(1, current - step))
  }

  if (auction.main.auc_type === "Up") {
    return String(current + step)
  }

  return String(current)
}
