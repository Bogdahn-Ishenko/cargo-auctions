import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types";
import {
  cityCoordinates,
  getRouteDistanceKm,
  type RouteCoordinates,
} from "@/shared/lib/RouteDistance";

export interface RouteMapPoint {
  city: string;
  coordinates: RouteCoordinates;
  label: string;
}

export interface AuctionRouteMap {
  distanceKm: number;
  durationHours: number;
  points: RouteMapPoint[];
  polyline: RouteCoordinates[];
}

export function buildAuctionRouteMap(
  auction: AuctionListItem,
): AuctionRouteMap | null {
  const loadCoordinates = cityCoordinates[auction.route.load.city];
  const unloadCoordinates = cityCoordinates[auction.route.unload.city];
  const distanceKm = getRouteDistanceKm(
    auction.route.load.city,
    auction.route.unload.city,
  );

  if (!loadCoordinates || !unloadCoordinates || distanceKm === null) return null;

  const midpoint = getRouteMidpoint(loadCoordinates, unloadCoordinates);

  return {
    distanceKm,
    durationHours: Math.max(1, Math.round(distanceKm / 62)),
    points: [
      {
        city: auction.route.load.city,
        coordinates: loadCoordinates,
        label: "Погрузка",
      },
      {
        city: auction.route.unload.city,
        coordinates: unloadCoordinates,
        label: "Выгрузка",
      },
    ],
    polyline: [loadCoordinates, midpoint, unloadCoordinates],
  };
}

function getRouteMidpoint(
  start: RouteCoordinates,
  end: RouteCoordinates,
): RouteCoordinates {
  return [
    (start[0] + end[0]) / 2 + 0.35,
    (start[1] + end[1]) / 2 - 0.25,
  ];
}
