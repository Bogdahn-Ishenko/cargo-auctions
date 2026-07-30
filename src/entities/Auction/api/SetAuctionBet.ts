import { request } from "@/shared/api/Request"
import { SetBetRequestSchema } from "../model/AuctionBets.schema"
import type { SetBetRequest } from "../model/AuctionBets.types"

export async function setAuctionBet(auctionUuid: string, payload: SetBetRequest): Promise<void> {
  const body = SetBetRequestSchema.parse(payload)

  await request<unknown>(`/auctions/${auctionUuid}/bets`, {
    method: "POST",
    body,
  })
}
