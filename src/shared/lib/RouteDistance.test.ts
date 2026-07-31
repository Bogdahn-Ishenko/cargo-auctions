import { describe, expect, it } from "vitest"
import { getRouteDistanceKm } from "./RouteDistance"

describe("getRouteDistanceKm", () => {
  it("returns route distance for known cities", () => {
    expect(getRouteDistanceKm("Казань", "Екатеринбург")).toBeGreaterThan(700)
  })

  it("returns null when city coordinates are missing", () => {
    expect(getRouteDistanceKm("Неизвестный город", "Екатеринбург")).toBeNull()
  })
})
