import { describe, expect, it } from "vitest"
import { auctionBetsMocks } from "@/shared/api/msw/AuctionBets.mock"
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
