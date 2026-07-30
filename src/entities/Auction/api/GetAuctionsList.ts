import { request } from "@/shared/api/Request"
import { AuctionListRequestSchema, AuctionListResponseSchema } from "../model/AuctionList.schema"
import type { AuctionListRequest, AuctionListResponse } from "../model/AuctionList.types"

export async function getAuctionsList(
  body: AuctionListRequest = {},
  signal?: AbortSignal,
): Promise<AuctionListResponse> {
  const response = await request<unknown>("/auctions/list", {
    method: "POST",
    body: AuctionListRequestSchema.parse(body),
    signal,
  })

  return AuctionListResponseSchema.parse(response)
}
