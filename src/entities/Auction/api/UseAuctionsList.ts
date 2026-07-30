import { useQuery } from "@tanstack/react-query"
import { getAuctionsList } from "./GetAuctionsList"
import type { AuctionListRequest } from "../model/AuctionList.types"

export const auctionListQueryKey = (request: AuctionListRequest) => ["auctions", "list", request] as const

export function useAuctionsList(request: AuctionListRequest = {}) {
  return useQuery({
    queryKey: auctionListQueryKey(request),
    queryFn: ({ signal }) => getAuctionsList(request, signal),
  })
}
