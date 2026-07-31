import { describe, expect, it } from "vitest"
import { auctionBetsMocks } from "@/shared/api/msw/AuctionBets.mock"
import { auctionDetailMocks } from "@/shared/api/msw/AuctionDetail.mock"
import { BetListResponseSchema, SetBetRequestSchema } from "./AuctionBets.schema"

describe("BetListResponseSchema", () => {
  it("parses generated MSW bets mocks", () => {
    const betLists = Object.values(auctionBetsMocks)

    expect(betLists.length).toBeGreaterThan(0)
    betLists.forEach((betList) => {
      expect(() => BetListResponseSchema.parse(betList)).not.toThrow()
    })
  })

  it("accepts an empty bets list", () => {
    expect(BetListResponseSchema.parse({ bets: [] })).toEqual({ bets: [] })
  })

  it("keeps rejected bet edge cases", () => {
    const rejectedBet = Object.values(auctionBetsMocks)
      .flatMap((betList) => betList.bets)
      .find((bet) => bet.is_rejected)

    expect(rejectedBet).toBeDefined()
    expect(rejectedBet?.cancel_reason).toBeTruthy()
  })

  it("keeps visible current prices consistent with visible bet history", () => {
    Object.values(auctionDetailMocks).forEach((auction) => {
      const betList = auctionBetsMocks[auction.main.order_uid]

      if (auction.trading.price?.current && !auction.trading.hide_bets_history) {
        expect(betList?.bets.length).toBeGreaterThan(0)
      }
    })
  })
})

describe("SetBetRequestSchema", () => {
  it("accepts positive prices", () => {
    expect(SetBetRequestSchema.parse({ price: 15000 })).toEqual({ price: 15000 })
  })

  it("rejects zero and negative prices", () => {
    expect(() => SetBetRequestSchema.parse({ price: 0 })).toThrow()
    expect(() => SetBetRequestSchema.parse({ price: -1 })).toThrow()
  })
})
