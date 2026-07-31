import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getToastErrorMessage } from "@/shared/lib/GetToastErrorMessage";
import { auctionBetsQueryKey } from "./UseAuctionBets";
import { auctionDetailQueryKey } from "./UseAuctionDetail";
import { setAuctionBet } from "./SetAuctionBet";

export function useSetAuctionBet(auctionUuid: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (price: number) => setAuctionBet(auctionUuid, { price }),
    onSuccess: () => {
      toast.success("Ставка отправлена");

      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["auctions", "list"] }),
        queryClient.invalidateQueries({
          queryKey: auctionBetsQueryKey(auctionUuid),
        }),
        queryClient.invalidateQueries({
          queryKey: auctionDetailQueryKey(auctionUuid),
        }),
      ]);
    },
    onError: (error) => {
      toast.error(getToastErrorMessage(error, "Не удалось отправить ставку"));
    },
  });
}
