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
        is_available: true,
        is_favorite: true,
        price_per_km_from: 100,
        price_per_km_to: 150,
        status: "Leading",
        weight_from: 5,
        weight_to: 20,
      }),
    ).toMatchObject({
      auc_type: ["Down"],
      cargo_num: "00000001059",
      is_available: true,
      is_favorite: true,
      price_per_km_from: 100,
      price_per_km_to: 150,
      status: ["Leading"],
      weight_from: 5,
      weight_to: 20,
    })
  })

  it("does not send inactive all filters", () => {
    expect(buildAuctionsListRequest(baseSearch)).not.toHaveProperty("auc_type")
    expect(buildAuctionsListRequest(baseSearch)).not.toHaveProperty("status")
  })
})
