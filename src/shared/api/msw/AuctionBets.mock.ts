import type { BetItem, BetListResponse } from "@/entities/Auction/model/AuctionBets.types"
import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types"
import { auctionListMock } from "./AuctionList.mock"

export const auctionBetsMocks: Record<string, BetListResponse> = Object.fromEntries(
  auctionListMock.data.map((auction) => [auction.main.order_uid, createBetList(auction)]),
)

function createBetList(auction: AuctionListItem): BetListResponse {
  if (!auction.trading.price || auction.trading.status === "Planning") {
    return { bets: [] }
  }

  const basePrice = auction.trading.price.current
  const bets: BetItem[] = [
    createBet(auction, 1, basePrice, "ООО Перевозчик", "Иван Петров"),
    createBet(auction, 2, Math.round(basePrice * 1.04), "ТК Север", "Сергей Иванов"),
  ]

  if (auction.trading.status_mobile === "Leading" || auction.trading.status_mobile === "Losing") {
    bets.push(createBet(auction, 3, Math.round(basePrice * 1.08), "ЛогистПро", "Анна Смирнова"))
  }

  if (auction.trading.status_mobile === "ChoosingWinner") {
    bets.push(createBet(auction, 3, Math.round(basePrice * 0.96), "Экспресс Транс", "Павел Орлов", true))
  }

  return { bets }
}

function createBet(
  auction: AuctionListItem,
  place: number,
  price: number,
  organizationName: string,
  contactName: string,
  isRejected = false,
): BetItem {
  return {
    id: auction.main.id * 100 + place,
    created_at: `2026-05-${String(25 + auction.main.id).padStart(2, "0")}T${String(12 - place).padStart(2, "0")}:15:00`,
    auction_id: auction.main.id,
    subscriber_id: 10 + place,
    contact_name: contactName,
    contact_phone: "+7 900 000-00-00",
    price_with_vat: price,
    price_no_vat: Number((price / 1.2).toFixed(2)),
    organization_id: 20 + place,
    organization_inn: `770000000${place}`,
    organization_name: organizationName,
    transporter_comment: null,
    is_rejected: isRejected,
    is_counter: false,
    place,
    is_win: auction.trading.status_mobile === "Winner" && place === 1,
    run_number: 0,
    cancel_reason: isRejected ? "Перевозчик отменил ставку" : "",
  }
}
