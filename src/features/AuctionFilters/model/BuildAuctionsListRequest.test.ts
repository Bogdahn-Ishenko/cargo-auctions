import { describe, expect, it } from "vitest"
import { buildAuctionsListRequest } from "./BuildAuctionsListRequest"
import type { AuctionsListSearch } from "./AuctionsListSearch.schema"

const baseSearch: AuctionsListSearch = {
  auc_type: "all",
  page: 1,
  per_page: 6,
  sort: "stop_time_asc",
  status: "all",
}

describe("buildAuctionsListRequest", () => {
  it("maps required pagination and sort params", () => {
    expect(buildAuctionsListRequest(baseSearch)).toEqual({
      page: 1,
      per_page: 6,
      sort: { "trading.stop_time": "asc" },
    })
  })

  it("maps active filters to OpenAPI request fields", () => {
    expect(
      buildAuctionsListRequest({
        ...baseSearch,
        auc_type: "Down",
        cargo_num: "00000001059",
        current_price_from: 30_000,
        current_price_to: 90_000,
        distance_from: 250,
        distance_to: 900,
        is_available: true,
        is_bidder: true,
        is_favorite: true,
        load_city: "Пермь",
        load_date_from: "2026-05-26",
        load_date_to: "2026-05-28",
        price_per_km_from: 100,
        price_per_km_to: 150,
        status: "Leading",
        unload_city: "Москва",
        unload_date_from: "2026-05-27",
        unload_date_to: "2026-05-29",
        weight_from: 5,
        weight_to: 20,
      }),
    ).toMatchObject({
      auc_type: ["Down"],
      cargo_num: "00000001059",
      current_price_from: 30_000,
      current_price_to: 90_000,
      distance_from: 250,
      distance_to: 900,
      is_available: true,
      is_bidder: true,
      is_favorite: true,
      load_city: "Пермь",
      load_date_from: "2026-05-26T00:00:00+03:00",
      load_date_to: "2026-05-28T23:59:59+03:00",
      price_per_km_from: 100,
      price_per_km_to: 150,
      status: ["Leading"],
      unload_city: "Москва",
      unload_date_from: "2026-05-27T00:00:00+03:00",
      unload_date_to: "2026-05-29T23:59:59+03:00",
      weight_from: 5,
      weight_to: 20,
    })
  })

  it("does not send inactive all filters", () => {
    expect(buildAuctionsListRequest(baseSearch)).not.toHaveProperty("auc_type")
    expect(buildAuctionsListRequest(baseSearch)).not.toHaveProperty("status")
  })
})
