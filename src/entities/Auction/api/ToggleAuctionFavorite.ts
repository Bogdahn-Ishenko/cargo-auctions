import { request } from "@/shared/api/Request"

export async function toggleAuctionFavorite(auctionUuid: string): Promise<void> {
  await request<unknown>(`/auctions/${auctionUuid}/favorite`, {
    method: "POST",
  })
}
