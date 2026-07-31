import type { AuctionDetailResponse } from "../model/AuctionDetail.types";

export function validateAuctionBet(
  auction: AuctionDetailResponse,
  price: number,
): string | null {
  const limits = auction.trading.price;

  if (!Number.isFinite(price) || price <= 0) return "Укажите сумму больше 0";
  if (!limits) return "Цена для ставки не указана";
  if (limits.min !== null && limits.min !== undefined && price < limits.min) {
    return `Минимальная ставка: ${limits.min} ₽`;
  }
  if (limits.max !== null && limits.max !== undefined && price > limits.max) {
    return `Максимальная ставка: ${limits.max} ₽`;
  }
  const isLimitBoundary = price === limits.min || price === limits.max;
  if (
    limits.step &&
    limits.current &&
    !isLimitBoundary &&
    Math.abs(price - limits.current) % limits.step !== 0
  ) {
    return `Ставка должна изменяться с шагом ${limits.step} ₽`;
  }

  if (
    auction.main.auc_type === "Down" &&
    limits.current &&
    price >= limits.current
  ) {
    return "Для аукциона на понижение ставка должна быть меньше текущей";
  }

  if (
    auction.main.auc_type === "Up" &&
    limits.current &&
    price <= limits.current
  ) {
    return "Для аукциона на повышение ставка должна быть больше текущей";
  }

  return null;
}
