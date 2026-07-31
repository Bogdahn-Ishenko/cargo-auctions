import { useQueryClient } from "@tanstack/react-query"
import { auctionBetsQueryKey } from "@/entities/Auction/api/UseAuctionBets"
import { auctionDetailQueryKey } from "@/entities/Auction/api/UseAuctionDetail"
import { getAuctionBets } from "@/entities/Auction/api/GetAuctionBets"
import { getAuctionDetail } from "@/entities/Auction/api/GetAuctionDetail"

export function usePrefetchAuctionDetail() {
  const queryClient = useQueryClient()

  return (auctionUuid: string) => {
    void queryClient.prefetchQuery({
      queryKey: auctionDetailQueryKey(auctionUuid),
      queryFn: ({ signal }) => getAuctionDetail(auctionUuid, signal),
    })

    void queryClient.prefetchQuery({
      queryKey: auctionBetsQueryKey(auctionUuid),
      queryFn: ({ signal }) => getAuctionBets(auctionUuid, signal),
    })
  }
}
