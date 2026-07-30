import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toggleAuctionFavorite } from "./ToggleAuctionFavorite"
import { auctionDetailQueryKey } from "./UseAuctionDetail"

export function useToggleAuctionFavorite(auctionUuid: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => toggleAuctionFavorite(auctionUuid),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["auctions", "list"] }),
        queryClient.invalidateQueries({ queryKey: auctionDetailQueryKey(auctionUuid) }),
      ])
    },
  })
}
