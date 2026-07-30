import type { BetListResponse } from "@/entities/Auction/model/AuctionBets.types"
import { auctionListMock } from "./AuctionList.mock"

const firstAuction = auctionListMock.data[0]!
const secondAuction = auctionListMock.data[1]!

export const auctionBetsMocks: Record<string, BetListResponse> = {
  [firstAuction.main.order_uid]: {
    bets: [
      {
        id: 42,
        created_at: "2026-05-26T13:05:00",
        auction_id: firstAuction.main.id,
        subscriber_id: 13,
        contact_name: "Иван Петров",
        contact_phone: "+7 900 000-00-00",
        price_with_vat: 30000,
        price_no_vat: 25000,
        organization_id: 14,
        organization_inn: "9616244307",
        organization_name: "ООО Перевозчик",
        transporter_comment: null,
        is_rejected: false,
        is_counter: false,
        place: 1,
        is_win: false,
        run_number: 0,
        cancel_reason: "",
      },
      {
        id: 43,
        created_at: "2026-05-26T12:40:00",
        auction_id: firstAuction.main.id,
        subscriber_id: 21,
        contact_name: "Сергей Иванов",
        contact_phone: "+7 900 111-22-33",
        price_with_vat: 31500,
        price_no_vat: 26250,
        organization_id: 22,
        organization_inn: "7712345678",
        organization_name: "ТК Север",
        transporter_comment: null,
        is_rejected: false,
        is_counter: false,
        place: 2,
        is_win: false,
        run_number: 0,
        cancel_reason: "",
      },
    ],
  },
  [secondAuction.main.order_uid]: {
    bets: [],
  },
}
