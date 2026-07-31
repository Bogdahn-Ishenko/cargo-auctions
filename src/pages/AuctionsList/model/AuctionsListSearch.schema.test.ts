import { describe, expect, it } from "vitest"
import { AuctionsListSearchSchema } from "./AuctionsListSearch.schema"

describe("AuctionsListSearchSchema", () => {
  it("applies stable defaults for empty search params", () => {
    expect(AuctionsListSearchSchema.parse({})).toMatchObject({
      auc_type: "all",
      page: 1,
      per_page: 6,
      sort: "stop_time_asc",
      status: "all",
    })
  })

  it("coerces numeric and boolean search params", () => {
    expect(
      AuctionsListSearchSchema.parse({
        current_price_from: "30000",
        is_available: "true",
        is_bidder: "true",
        is_favorite: "true",
        load_city: "Пермь",
        load_date_from: "2026-05-26",
        page: "2",
        per_page: "10",
        price_per_km_from: "100",
        unload_city: "Москва",
        unload_date_to: "2026-05-29",
        weight_to: "20",
      }),
    ).toMatchObject({
      current_price_from: 30000,
      is_available: true,
      is_bidder: true,
      is_favorite: true,
      load_city: "Пермь",
      load_date_from: "2026-05-26",
      page: 2,
      per_page: 10,
      price_per_km_from: 100,
      unload_city: "Москва",
      unload_date_to: "2026-05-29",
      weight_to: 20,
    })
  })

  it("falls back to default enum values for invalid filters", () => {
    expect(
      AuctionsListSearchSchema.parse({
        auc_type: "Invalid",
        sort: "unknown",
        status: "Invalid",
      }),
    ).toMatchObject({
      auc_type: "all",
      sort: "stop_time_asc",
      status: "all",
    })
  })
})
