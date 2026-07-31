export type RouteCoordinates = [number, number]

export const cityCoordinates: Record<string, RouteCoordinates> = {
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
}

export function getRouteDistanceKm(loadCity: string, unloadCity: string) {
  const loadCoordinates = cityCoordinates[loadCity]
  const unloadCoordinates = cityCoordinates[unloadCity]

  if (!loadCoordinates || !unloadCoordinates) return null

  return Math.round(getDistanceKm(loadCoordinates, unloadCoordinates) * 1.18)
}

function getDistanceKm(start: RouteCoordinates, end: RouteCoordinates) {
  const earthRadiusKm = 6371
  const latitudeDelta = toRadians(end[0] - start[0])
  const longitudeDelta = toRadians(end[1] - start[1])
  const startLatitude = toRadians(start[0])
  const endLatitude = toRadians(end[0])

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(startLatitude) *
      Math.cos(endLatitude) *
      Math.sin(longitudeDelta / 2) ** 2

  return (
    earthRadiusKm *
    2 *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  )
}

function toRadians(value: number) {
  return (value * Math.PI) / 180
}
