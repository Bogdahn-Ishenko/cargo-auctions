import { request } from "@/shared/api/Request"
import { AuctionDetailResponseSchema } from "../model/AuctionDetail.schema"
import type { AuctionDetailResponse } from "../model/AuctionDetail.types"

export async function getAuctionDetail(auctionUuid: string, signal?: AbortSignal): Promise<AuctionDetailResponse> {
  const response = await request<unknown>(`/auctions/${auctionUuid}`, { signal })

  return AuctionDetailResponseSchema.parse(response)
}
