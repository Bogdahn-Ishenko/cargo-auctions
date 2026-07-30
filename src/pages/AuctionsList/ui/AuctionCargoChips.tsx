import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types"

interface AuctionCargoChipsProps {
  auction: AuctionListItem
}

export function AuctionCargoChips({ auction }: AuctionCargoChipsProps) {
  const chips = [
    auction.cargo.name,
    `${auction.cargo.weight} т`,
    `${auction.cargo.volume} м3`,
    auction.cargo.body_type,
  ]

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <span
          className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600"
          key={chip}
        >
          {chip}
        </span>
      ))}
    </div>
  )
}
