import { describe, expect, it } from "vitest"
import { buildQueryString } from "./Request"

describe("buildQueryString", () => {
  it("serializes primitive query params", () => {
    expect(buildQueryString({ page: 2, search: "cargo", active: true })).toBe(
      "?page=2&search=cargo&active=true",
    )
  })

  it("skips null, undefined and unsupported values", () => {
    expect(buildQueryString({ page: 1, empty: null, missing: undefined, nested: { id: 1 } })).toBe("?page=1")
  })

  it("serializes arrays as repeated query params", () => {
    expect(buildQueryString({ status: ["Leading", "Losing"], page: 1 })).toBe(
      "?status=Leading&status=Losing&page=1",
    )
  })
})
