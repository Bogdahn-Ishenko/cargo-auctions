import { describe, expect, it } from "vitest"
import { auctionDetailMocks } from "@/shared/api/msw/AuctionDetail.mock"
import { AuctionDetailResponseSchema } from "./AuctionDetail.schema"

describe("AuctionDetailResponseSchema", () => {
  it("parses generated MSW detail mocks", () => {
    const details = Object.values(auctionDetailMocks)

    expect(details.length).toBeGreaterThan(0)
    details.forEach((detail) => {
      expect(() => AuctionDetailResponseSchema.parse(detail)).not.toThrow()
    })
  })

  it("accepts auctions without current price", () => {
    const detailWithoutPrice = Object.values(auctionDetailMocks).find((detail) => detail.trading.price === null)

    expect(detailWithoutPrice).toBeDefined()
    expect(AuctionDetailResponseSchema.parse(detailWithoutPrice).trading.price).toBeNull()
  })
})
