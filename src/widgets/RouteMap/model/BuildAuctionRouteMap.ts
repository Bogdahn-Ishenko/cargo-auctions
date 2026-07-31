import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types";

export interface RouteMapPoint {
  city: string;
  coordinates: [number, number];
  label: string;
}

export interface AuctionRouteMap {
  distanceKm: number;
  durationHours: number;
  points: RouteMapPoint[];
  polyline: [number, number][];
}

const cityCoordinates: Record<string, [number, number]> = {
  "Барнаул": [53.3481, 83.7798],
  "Белгород": [50.5954, 36.5873],
  "Воронеж": [51.6608, 39.2003],
  "Екатеринбург": [56.8389, 60.6057],
  "Казань": [55.7961, 49.1064],
  "Краснодар": [45.0355, 38.9753],
  "Москва": [55.7558, 37.6173],
  "Нижний Новгород": [56.2965, 43.9361],
  "Новосибирск": [55.0084, 82.9357],
  "Омск": [54.9893, 73.3682],
  "Пермь": [58.0105, 56.2502],
  "Ростов-на-Дону": [47.2357, 39.7015],
  "Самара": [53.1959, 50.1002],
  "Санкт-Петербург": [59.9386, 30.3141],
  "Тюмень": [57.153, 65.5343],
  "Уфа": [54.7351, 55.9587],
  "Челябинск": [55.1644, 61.4368],
};

export function buildAuctionRouteMap(
  auction: AuctionListItem,
): AuctionRouteMap | null {
  const loadCoordinates = cityCoordinates[auction.route.load.city];
  const unloadCoordinates = cityCoordinates[auction.route.unload.city];

  if (!loadCoordinates || !unloadCoordinates) return null;

  const distanceKm = Math.round(
    getDistanceKm(loadCoordinates, unloadCoordinates) * 1.18,
  );
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
  start: [number, number],
  end: [number, number],
): [number, number] {
  return [
    (start[0] + end[0]) / 2 + 0.35,
    (start[1] + end[1]) / 2 - 0.25,
  ];
}

function getDistanceKm(start: [number, number], end: [number, number]) {
  const earthRadiusKm = 6371;
  const latitudeDelta = toRadians(end[0] - start[0]);
  const longitudeDelta = toRadians(end[1] - start[1]);
  const startLatitude = toRadians(start[0]);
  const endLatitude = toRadians(end[0]);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(startLatitude) *
      Math.cos(endLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return (
    earthRadiusKm *
    2 *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}
