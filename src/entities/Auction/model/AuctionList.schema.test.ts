import { describe, expect, it } from "vitest"
import { AuctionListRequestSchema } from "./AuctionList.schema"

describe("AuctionListRequestSchema", () => {
  it("accepts list filters used by the auctions page", () => {
    expect(
      AuctionListRequestSchema.parse({
        auc_type: ["Down"],
        cargo_num: "00000001059",
        is_available: true,
        page: 1,
        per_page: 6,
        price_per_km_from: 100,
        price_per_km_to: 150,
        status: ["Leading"],
        weight_from: 5,
        weight_to: 20,
      }),
    ).toMatchObject({
      auc_type: ["Down"],
      is_available: true,
      price_per_km_from: 100,
      status: ["Leading"],
      weight_to: 20,
    })
  })

  it("accepts nullable array filters from OpenAPI", () => {
    expect(
      AuctionListRequestSchema.parse({
        auc_type: null,
        status: null,
        sort: null,
      }),
    ).toMatchObject({
      auc_type: null,
      status: null,
      sort: null,
    })
  })

  it("rejects invalid auction and trading statuses", () => {
    expect(() =>
      AuctionListRequestSchema.parse({
        auc_type: ["Invalid"],
        status: ["Invalid"],
      }),
    ).toThrow()
  })
})
