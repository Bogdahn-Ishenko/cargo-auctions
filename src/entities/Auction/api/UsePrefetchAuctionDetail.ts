import { useQueryClient } from "@tanstack/react-query";
import { getAuctionBets } from "./GetAuctionBets";
import { getAuctionDetail } from "./GetAuctionDetail";
import { auctionBetsQueryKey, auctionBetsStaleTime } from "./UseAuctionBets";
import {
  auctionDetailQueryKey,
  auctionDetailStaleTime,
} from "./UseAuctionDetail";

export function usePrefetchAuctionDetail(): (auctionUuid: string) => void {
  const queryClient = useQueryClient();

  return (auctionUuid: string) => {
    void queryClient.prefetchQuery({
      queryKey: auctionDetailQueryKey(auctionUuid),
      queryFn: ({ signal }) => getAuctionDetail(auctionUuid, signal),
      staleTime: auctionDetailStaleTime,
    });

    void queryClient.prefetchQuery({
      queryKey: auctionBetsQueryKey(auctionUuid),
      queryFn: ({ signal }) => getAuctionBets(auctionUuid, signal),
      staleTime: auctionBetsStaleTime,
    });
  };
}
