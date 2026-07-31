import { describe, expect, it } from "vitest";
import { auctionListItemsMock } from "@/shared/api/msw/AuctionList.mock";
import { buildAuctionRouteMap } from "./BuildAuctionRouteMap";

describe("buildAuctionRouteMap", () => {
  it("builds a local route for known mock cities", () => {
    const auction = auctionListItemsMock.find(
      (item) =>
        item.route.load.city === "Пермь" && item.route.unload.city === "Москва",
    );

    expect(auction).toBeDefined();

    const route = buildAuctionRouteMap(auction!);

    expect(route?.points).toHaveLength(2);
    expect(route?.polyline).toHaveLength(3);
    expect(route?.distanceKm).toBeGreaterThan(0);
    expect(route?.durationHours).toBeGreaterThan(0);
  });

  it("returns null when city coordinates are missing", () => {
    const firstAuction = auctionListItemsMock[0];

    if (!firstAuction) {
      throw new Error("Expected at least one mock auction");
    }

    const auction = structuredClone(firstAuction);

    auction.route.load.city = "Неизвестный город";

    expect(buildAuctionRouteMap(auction)).toBeNull();
  });
});
