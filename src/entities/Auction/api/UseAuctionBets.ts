import { useQuery } from "@tanstack/react-query"
import { getAuctionBets } from "./GetAuctionBets"

export const auctionBetsQueryKey = (auctionUuid: string) => ["auctions", "bets", auctionUuid] as const
export const auctionBetsStaleTime = 30_000

export function useAuctionBets(auctionUuid: string) {
  return useQuery({
    queryKey: auctionBetsQueryKey(auctionUuid),
    queryFn: ({ signal }) => getAuctionBets(auctionUuid, signal),
    staleTime: auctionBetsStaleTime,
  })
}
