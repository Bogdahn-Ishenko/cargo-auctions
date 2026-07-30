import { request } from "@/shared/api/Request"
import { BetListResponseSchema } from "../model/AuctionBets.schema"
import type { BetListResponse } from "../model/AuctionBets.types"

export async function getAuctionBets(auctionUuid: string, signal?: AbortSignal): Promise<BetListResponse> {
  const response = await request<unknown>(`/auctions/${auctionUuid}/bets`, { signal })

  return BetListResponseSchema.parse(response)
}
