import { useQueryClient } from "@tanstack/react-query"
import { auctionBetsQueryKey, auctionBetsStaleTime } from "@/entities/Auction/api/UseAuctionBets"
import { auctionDetailQueryKey, auctionDetailStaleTime } from "@/entities/Auction/api/UseAuctionDetail"
import { getAuctionBets } from "@/entities/Auction/api/GetAuctionBets"
import { getAuctionDetail } from "@/entities/Auction/api/GetAuctionDetail"

export function usePrefetchAuctionDetail() {
  const queryClient = useQueryClient()

  return (auctionUuid: string) => {
    void queryClient.prefetchQuery({
      queryKey: auctionDetailQueryKey(auctionUuid),
      queryFn: ({ signal }) => getAuctionDetail(auctionUuid, signal),
      staleTime: auctionDetailStaleTime,
    })

    void queryClient.prefetchQuery({
      queryKey: auctionBetsQueryKey(auctionUuid),
      queryFn: ({ signal }) => getAuctionBets(auctionUuid, signal),
      staleTime: auctionBetsStaleTime,
    })
  }
}
