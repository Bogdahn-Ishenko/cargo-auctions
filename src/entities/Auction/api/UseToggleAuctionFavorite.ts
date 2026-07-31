import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getToastErrorMessage } from "@/shared/lib/GetToastErrorMessage";
import { toggleAuctionFavorite } from "./ToggleAuctionFavorite";
import { auctionDetailQueryKey } from "./UseAuctionDetail";

interface ToggleAuctionFavoriteOptions {
  nextIsFavorite: boolean;
}

export function useToggleAuctionFavorite(auctionUuid: string) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ToggleAuctionFavoriteOptions>({
    mutationFn: () => toggleAuctionFavorite(auctionUuid),
    onSuccess: async (_data, options) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["auctions", "list"] }),
        queryClient.invalidateQueries({
          queryKey: auctionDetailQueryKey(auctionUuid),
        }),
      ]);
      toast.success(
        options.nextIsFavorite
          ? "Аукцион добавлен в избранное"
          : "Аукцион удален из избранного",
      );
    },
    onError: (error) => {
      toast.error(getToastErrorMessage(error, "Не удалось обновить избранное"));
    },
  });
}
