import { describe, expect, it } from "vitest"
import { auctionDetailMocks } from "@/shared/api/msw/AuctionDetail.mock"
import { validateAuctionBet } from "./ValidateAuctionBet"

const downAuction = Object.values(auctionDetailMocks).find((auction) => auction.main.auc_type === "Down" && auction.trading.price)!
const upAuction = Object.values(auctionDetailMocks).find((auction) => auction.main.auc_type === "Up" && auction.trading.price)!

describe("validateAuctionBet", () => {
  it("accepts a valid down-auction bet", () => {
    const current = downAuction.trading.price?.current ?? 0
    const step = downAuction.trading.price?.step ?? 1

    expect(validateAuctionBet(downAuction, current - step)).toBeNull()
  })

  it("rejects down-auction bets above current price", () => {
    const current = downAuction.trading.price?.current ?? 0

    expect(validateAuctionBet(downAuction, current)).toBe("Для аукциона на понижение ставка должна быть меньше текущей")
  })

  it("accepts a valid up-auction bet", () => {
    const current = upAuction.trading.price?.current ?? 0
    const step = upAuction.trading.price?.step ?? 1

    expect(validateAuctionBet(upAuction, current + step)).toBeNull()
  })

  it("rejects values outside min and max limits", () => {
    const min = downAuction.trading.price?.min ?? 0
    const max = downAuction.trading.price?.max ?? 0

    expect(validateAuctionBet(downAuction, min - 1)).toBe(`Минимальная ставка: ${min} ₽`)
    expect(validateAuctionBet(downAuction, max + 1)).toBe(`Максимальная ставка: ${max} ₽`)
  })
})
