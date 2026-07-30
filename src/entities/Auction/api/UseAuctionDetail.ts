import { useQuery } from "@tanstack/react-query"
import { getAuctionDetail } from "./GetAuctionDetail"

export const auctionDetailQueryKey = (auctionUuid: string) => ["auctions", "detail", auctionUuid] as const

export function useAuctionDetail(auctionUuid: string) {
  return useQuery({
    queryKey: auctionDetailQueryKey(auctionUuid),
    queryFn: ({ signal }) => getAuctionDetail(auctionUuid, signal),
  })
}
