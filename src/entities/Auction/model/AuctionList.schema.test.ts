import { describe, expect, it } from "vitest"
import { AuctionListRequestSchema } from "./AuctionList.schema"

describe("AuctionListRequestSchema", () => {
  it("accepts list filters used by the auctions page", () => {
    expect(
      AuctionListRequestSchema.parse({
        auc_type: ["Down"],
        cargo_num: "00000001059",
        current_price_from: 30_000,
        current_price_to: 90_000,
        is_available: true,
        is_bidder: true,
        is_favorite: true,
        load_city: "Пермь",
        load_date_from: "2026-05-26T00:00:00+03:00",
        load_date_to: "2026-05-28T23:59:59+03:00",
        page: 1,
        per_page: 6,
        price_per_km_from: 100,
        price_per_km_to: 150,
        status: ["Leading"],
        unload_city: "Москва",
        unload_date_from: "2026-05-27T00:00:00+03:00",
        unload_date_to: "2026-05-29T23:59:59+03:00",
        weight_from: 5,
        weight_to: 20,
      }),
    ).toMatchObject({
      auc_type: ["Down"],
      current_price_from: 30_000,
      is_available: true,
      is_bidder: true,
      is_favorite: true,
      load_city: "Пермь",
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
