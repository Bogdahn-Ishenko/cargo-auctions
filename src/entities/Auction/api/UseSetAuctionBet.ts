import { useMutation, useQueryClient } from "@tanstack/react-query"
import { auctionBetsQueryKey } from "./UseAuctionBets"
import { auctionDetailQueryKey } from "./UseAuctionDetail"
import { setAuctionBet } from "./SetAuctionBet"

export function useSetAuctionBet(auctionUuid: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (price: number) => setAuctionBet(auctionUuid, { price }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: auctionBetsQueryKey(auctionUuid) }),
        queryClient.invalidateQueries({ queryKey: auctionDetailQueryKey(auctionUuid) }),
      ])
    },
  })
}
