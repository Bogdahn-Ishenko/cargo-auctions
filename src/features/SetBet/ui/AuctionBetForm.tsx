import type { FormEvent } from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiSendPlaneLine } from "@remixicon/react";
import type { SubmitErrorHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSetAuctionBet } from "@/entities/Auction/api/UseSetAuctionBet";
import { validateAuctionBet } from "@/entities/Auction/lib/ValidateAuctionBet";
import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types";
import { ApiError } from "@/shared/api/ApiError";
import { formatPrice } from "@/shared/lib/FormatPrice";
import {
  BetFormSchema,
  type BetFormInput,
  type BetFormValues,
} from "../model/AuctionBetForm.schema";

interface AuctionBetFormProps {
  auction: AuctionDetailResponse;
}

export function AuctionBetForm({ auction }: AuctionBetFormProps) {
  const [error, setError] = useState("");
  const initialBidValue = getInitialBidValue(auction);
  const mutation = useSetAuctionBet(auction.main.order_uid);
  const isDisabled = !auction.trading.can_set_bet || mutation.isPending;
  const limitsText = getBetLimitsText(auction);
  const form = useForm<BetFormInput, unknown, BetFormValues>({
    defaultValues: {
      price: "",
    },
    resolver: zodResolver(BetFormSchema),
  });
  const draftPrice = form.watch("price");

  function submitBet(values: BetFormValues) {
    const validationError = validateAuctionBet(auction, values.price);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setError("");
    mutation.mutate(values.price);
  }

  const handleInvalidSubmit: SubmitErrorHandler<BetFormInput> = (errors) => {
    const message = errors.price?.message ?? "Укажите сумму ставки";
    setError(message);
    toast.error(message);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    void form.handleSubmit(submitBet, handleInvalidSubmit)(event);
  }

  function changeDraftPrice() {
    setError("");

    if (mutation.isError || mutation.isSuccess) {
      mutation.reset();
    }
  }

  return (
    <form
      className="grid gap-3 rounded-xl border border-border bg-muted p-4"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label
          className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
          htmlFor="bet-price"
        >
          Ваша ставка
        </Label>
        <Controller
          control={form.control}
          name="price"
          render={({ field }) => (
            <Input
              className="h-11 border-border bg-card text-center font-mono text-lg font-bold text-foreground focus-visible:border-ring"
              disabled={isDisabled}
              id="bet-price"
              inputMode="numeric"
              max={auction.trading.price?.max ?? undefined}
              min={auction.trading.price?.min ?? 1}
              onChange={(event) => {
                field.onChange(event.target.value);
                changeDraftPrice();
              }}
              placeholder={
                initialBidValue ? String(initialBidValue) : "Введите сумму"
              }
              type="number"
              value={field.value}
            />
          )}
        />
      </div>

      <div className="min-h-4 text-center text-[11px] text-muted-foreground">
        {getBetStatusText({
          error,
          mutationError: mutation.error,
          isError: mutation.isError,
          isSuccess: mutation.isSuccess,
          price: Number(draftPrice) || null,
        })}
      </div>

      {limitsText ? (
        <div className="text-center text-[11px] leading-4 text-muted-foreground">
          {limitsText}
        </div>
      ) : null}

      <Button
        className="h-10 w-full bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={isDisabled}
        type="submit"
      >
        <RiSendPlaneLine />
        {mutation.isPending
          ? "Отправка"
          : auction.trading.can_set_bet
            ? "Сделать ставку"
            : "Ставка недоступна"}
      </Button>
    </form>
  );
}

interface BetStatusTextOptions {
  error: string;
  mutationError: Error | null;
  isError: boolean;
  isSuccess: boolean;
  price: number | null;
}

function getBetStatusText({
  error,
  mutationError,
  isError,
  isSuccess,
  price,
}: BetStatusTextOptions) {
  if (error) return error;
  if (isSuccess) return "Ставка отправлена";
  if (isError)
    return mutationError instanceof ApiError
      ? mutationError.problem.message
      : "Не удалось отправить ставку";

  return `Будет отправлено: ${formatPrice(price)}`;
}

function getInitialBidValue(auction: AuctionDetailResponse) {
  const price = auction.trading.price;
  const current = price?.current;
  const step = price?.step ?? 0;

  if (!current) return 0;

  if (auction.main.auc_type === "Down") {
    return Math.max(1, current - step);
  }

  if (auction.main.auc_type === "Up") {
    return current + step;
  }

  return current;
}

function getBetLimitsText(auction: AuctionDetailResponse) {
  const price = auction.trading.price;

  if (!price) return "";

  const direction =
    auction.main.auc_type === "Down"
      ? "ниже текущей цены"
      : "выше текущей цены";
  const min = price.min ? `мин. ${formatPrice(price.min)}` : "";
  const max = price.max ? `макс. ${formatPrice(price.max)}` : "";
  const step = price.step ? `шаг ${formatPrice(price.step)}` : "";

  return [direction, min, max, step].filter(Boolean).join(" · ");
}
