import type { AuctionListItem, AuctionListResponse } from "@/entities/Auction/model/AuctionList.types"

const baseAuctionItemsMock: AuctionListItem[] = [
  createAuction({
    id: 1,
    cargoNum: "00000001059",
    type: "Down",
    status: "Auction",
    tradingStatus: "NotParticipating",
    loadCity: "Пермь",
    unloadCity: "Москва",
    cargoName: "Мороженое",
    weight: 1,
    volume: 1,
    bodyType: "тентованный",
    currentPrice: 30000,
    pricePerKm: 199,
    isAvailable: true,
  }),
  createAuction({
    id: 2,
    cargoNum: "00000001060",
    type: "Request",
    status: "Planning",
    tradingStatus: "Unknown",
    loadCity: "Казань",
    unloadCity: "Екатеринбург",
    cargoName: "Оборудование",
    weight: 8,
    volume: 42,
    bodyType: "фургон",
    currentPrice: null,
    pricePerKm: null,
    isAvailable: false,
  }),
  createAuction({
    id: 3,
    cargoNum: "00000001061",
    type: "Down",
    status: "Auction",
    tradingStatus: "Leading",
    loadCity: "Москва",
    unloadCity: "Санкт-Петербург",
    cargoName: "Бытовая техника",
    weight: 22,
    volume: 86,
    bodyType: "тентованный",
    currentPrice: 87500,
    pricePerKm: 123,
    isAvailable: true,
  }),
  createAuction({
    id: 4,
    cargoNum: "00000001062",
    type: "Up",
    status: "Auction",
    tradingStatus: "Losing",
    loadCity: "Екатеринбург",
    unloadCity: "Новосибирск",
    cargoName: "Металлопрокат",
    weight: 18,
    volume: 42,
    bodyType: "бортовой",
    currentPrice: 145000,
    pricePerKm: 102,
    isAvailable: true,
  }),
  createAuction({
    id: 5,
    cargoNum: "00000001063",
    type: "FixPrice",
    status: "Planning",
    tradingStatus: "NotParticipating",
    loadCity: "Казань",
    unloadCity: "Уфа",
    cargoName: "Продукты питания",
    weight: 14,
    volume: 60,
    bodyType: "рефрижератор",
    currentPrice: 62000,
    pricePerKm: 118,
    isAvailable: true,
  }),
  createAuction({
    id: 6,
    cargoNum: "00000001064",
    type: "Down",
    status: "Auction",
    tradingStatus: "Unknown",
    loadCity: "Ростов-на-Дону",
    unloadCity: "Краснодар",
    cargoName: "Стройматериалы",
    weight: 20,
    volume: 76,
    bodyType: "бортовой",
    currentPrice: 38000,
    pricePerKm: 129,
    isAvailable: false,
  }),
  createAuction({
    id: 7,
    cargoNum: "00000001065",
    type: "Request",
    status: "WaitDeal",
    tradingStatus: "Confirmed",
    loadCity: "Самара",
    unloadCity: "Нижний Новгород",
    cargoName: "Автозапчасти",
    weight: 6,
    volume: 34,
    bodyType: "цельнометаллический",
    currentPrice: 52000,
    pricePerKm: 111,
    isAvailable: false,
  }),
  createAuction({
    id: 8,
    cargoNum: "00000001066",
    type: "Down",
    status: "Auction",
    tradingStatus: "NotParticipating",
    loadCity: "Воронеж",
    unloadCity: "Белгород",
    cargoName: "Напитки",
    weight: 12,
    volume: 50,
    bodyType: "изотермический",
    currentPrice: 41000,
    pricePerKm: 136,
    isAvailable: true,
  }),
  createAuction({
    id: 9,
    cargoNum: "00000001067",
    type: "Up",
    status: "DeterminateWinner",
    tradingStatus: "ChoosingWinner",
    loadCity: "Челябинск",
    unloadCity: "Тюмень",
    cargoName: "Промышленная химия",
    weight: 16,
    volume: 38,
    bodyType: "цистерна",
    currentPrice: 99000,
    pricePerKm: 141,
    isAvailable: false,
  }),
  createAuction({
    id: 10,
    cargoNum: "00000001068",
    type: "FixPrice",
    status: "Finished",
    tradingStatus: "Winner",
    loadCity: "Омск",
    unloadCity: "Барнаул",
    cargoName: "Мебель",
    weight: 10,
    volume: 72,
    bodyType: "фургон",
    currentPrice: 76000,
    pricePerKm: 128,
    isAvailable: false,
  }),
]

export const auctionListItemsMock: AuctionListItem[] = [
  ...baseAuctionItemsMock,
  ...Array.from({ length: 40 }, (_, index) => createGeneratedAuction(index + 11)),
]

export const auctionListMock: AuctionListResponse = {
  data: auctionListItemsMock,
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 6,
    to: auctionListItemsMock.length,
    total: auctionListItemsMock.length,
  },
}

interface CreateAuctionOptions {
  bodyType: string
  cargoName: string
  cargoNum: string
  currentPrice: number | null
  id: number
  isAvailable: boolean
  loadCity: string
  pricePerKm: number | null
  status: AuctionListItem["trading"]["status"]
  tradingStatus: AuctionListItem["trading"]["status_mobile"]
  type: AuctionListItem["main"]["auc_type"]
  unloadCity: string
  volume: number
  weight: number
}

function createAuction(options: CreateAuctionOptions): AuctionListItem {
  const startPrice = options.currentPrice ? Math.round(options.currentPrice * 1.22) : null

  return {
    main: {
      id: options.id,
      cargo_num: options.cargoNum,
      cargo_date: getDateTime(options.id, -20, 10),
      auc_type: options.type,
      order_uid: `00000000-0000-4000-8000-${String(options.id).padStart(12, "0")}`,
      created_at: getDateTime(options.id, -1, 8),
      priority_sort: options.id - 1,
      is_assembly: false,
      price_per_km: options.pricePerKm,
    },
    organizer: {
      organization_name: getOrganizerName(options.id),
    },
    route: {
      load: {
        city: options.loadCity,
        address: getAddress(options.loadCity, options.id),
        date: getDateTime(options.id, 0, 9),
        city_gc_id: options.id * 10,
        points_count: 1,
      },
      unload: {
        city: options.unloadCity,
        address: getAddress(options.unloadCity, options.id + 20),
        date: getDateTime(options.id, 1, 18),
        city_gc_id: options.id * 10 + 1,
        points_count: 1,
      },
    },
    cargo: {
      name: options.cargoName,
      weight: options.weight,
      volume: options.volume,
      body_type: options.bodyType,
      truck_count: 1,
      is_cargo: true,
    },
    trading: {
      status: options.status,
      status_mobile: options.tradingStatus,
      start_time: getDateTime(options.id, 0, 9),
      stop_time: getDateTime(options.id, 0, 18),
      can_set_bet: options.isAvailable,
      is_available: options.isAvailable,
      is_favorite: options.id % 3 === 0,
      price: options.currentPrice === null || startPrice === null
        ? null
        : {
            start: startPrice,
            current: options.currentPrice,
            current_no_vat: Number((options.currentPrice / 1.2).toFixed(2)),
            step: getStep(options.currentPrice),
          },
    },
    payment: {
      form: options.id % 2 === 0 ? "Безналичная без НДС" : "Безналичная с НДС",
      currency_code: "643",
    },
  }
}

function createGeneratedAuction(id: number): AuctionListItem {
  const auctionTypes: CreateAuctionOptions["type"][] = ["Down", "Up", "Request", "FixPrice"]
  const auctionStatuses: CreateAuctionOptions["status"][] = [
    "Auction",
    "Planning",
    "DeterminateWinner",
    "WaitDeal",
    "Finished",
    "Canceled",
  ]
  const tradingStatuses: CreateAuctionOptions["tradingStatus"][] = [
    "NotParticipating",
    "Leading",
    "Losing",
    "Confirmed",
    "ChoosingWinner",
    "Winner",
    "Unknown",
  ]
  const loadCities = ["Пермь", "Казань", "Москва", "Екатеринбург", "Самара", "Воронеж", "Омск", "Челябинск"]
  const unloadCities = ["Москва", "Екатеринбург", "Санкт-Петербург", "Новосибирск", "Уфа", "Краснодар", "Барнаул", "Тюмень"]
  const cargos = [
    "Паллетированный груз",
    "Оборудование",
    "Стройматериалы",
    "Продукты питания",
    "Автозапчасти",
    "Мебель",
    "Бытовая химия",
    "Упаковка",
  ]
  const bodyTypes = ["тентованный", "фургон", "бортовой", "рефрижератор", "изотермический"]
  const type = pickOption(auctionTypes, id)
  const isPlannedRequest = type === "Request" && id % 3 === 0
  const currentPrice = isPlannedRequest ? null : 32_000 + id * 2_750

  return createAuction({
    id,
    cargoNum: String(1058 + id).padStart(11, "0"),
    type,
    status: pickOption(auctionStatuses, id),
    tradingStatus: pickOption(tradingStatuses, id),
    loadCity: pickOption(loadCities, id),
    unloadCity: pickOption(unloadCities, id),
    cargoName: pickOption(cargos, id),
    weight: 2 + (id % 24),
    volume: 12 + (id % 80),
    bodyType: pickOption(bodyTypes, id),
    currentPrice,
    pricePerKm: currentPrice ? 90 + (id % 80) : null,
    isAvailable: currentPrice !== null && id % 4 !== 0,
  })
}

function getOrganizerName(id: number) {
  const names = [
    "ЛИМ",
    "Тестовый заказчик",
    "Технологии Будущего",
    "УралМеталлСнаб",
    "АгроТорг",
    "СтройСнаб Юг",
    "АвтоЛогистика",
    "Регион Напитки",
    "ХимПром",
    "ДомМаркет",
  ]

  return names[id - 1] ?? "Заказчик"
}

function pickOption<T>(options: T[], id: number) {
  const option = options[id % options.length]

  if (option === undefined) {
    throw new Error("Mock options list must not be empty")
  }

  return option
}

function getAddress(city: string, seed: number) {
  return `${city}, склад ${seed}`
}

function getDateTime(id: number, dayOffset: number, hour: number) {
  const date = new Date(Date.UTC(2026, 4, 25 + id + dayOffset, hour, 0, 0))
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const day = String(date.getUTCDate()).padStart(2, "0")
  const hours = String(date.getUTCHours()).padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:00:00`
}

function getStep(price: number) {
  if (price >= 100000) return 1000
  if (price >= 50000) return 500

  return 250
}
