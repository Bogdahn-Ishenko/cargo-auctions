import { delay, http, HttpResponse } from "msw"
import { SetBetRequestSchema } from "@/entities/Auction/model/AuctionBets.schema"
import type { BetItem } from "@/entities/Auction/model/AuctionBets.types"
import { validateAuctionBet } from "@/entities/Auction/lib/ValidateAuctionBet"
import { AuctionListRequestSchema } from "@/entities/Auction/model/AuctionList.schema"
import type { AuctionListItem, AuctionListResponse } from "@/entities/Auction/model/AuctionList.types"
import { getRouteDistanceKm } from "@/shared/lib/RouteDistance"
import { auctionBetsMocks } from "./AuctionBets.mock"
import { auctionDetailMocks } from "./AuctionDetail.mock"
import { auctionListMock } from "./AuctionList.mock"

export const handlers = [
  http.post("/api/v1/auctions/list", async ({ request }) => {
    await delay(300)
    const payload: unknown = await request.json().catch(() => ({}))
    const body = AuctionListRequestSchema.parse(payload)
    const page = body.page ?? 1
    const perPage = body.per_page ?? 6

    const filtered = auctionListMock.data.filter((auction) => {
      if (body.cargo_num && !auction.main.cargo_num.includes(body.cargo_num)) return false
      if (body.auc_type?.length && !body.auc_type.includes(auction.main.auc_type)) return false
      if (body.status?.length && !body.status.includes(auction.trading.status_mobile)) return false
      if (body.current_price_from !== undefined && body.current_price_from !== null && (auction.trading.price?.current ?? 0) < body.current_price_from) {
        return false
      }
      if (body.current_price_to !== undefined && body.current_price_to !== null && (auction.trading.price?.current ?? 0) > body.current_price_to) {
        return false
      }
      const distance = getAuctionDistance(auction)
      if (body.distance_from !== undefined && body.distance_from !== null && (distance ?? 0) < body.distance_from) {
        return false
      }
      if (body.distance_to !== undefined && body.distance_to !== null && (distance ?? 0) > body.distance_to) {
        return false
      }
      if (body.load_city && !includesText(auction.route.load.city, body.load_city)) return false
      if (body.load_date_from && new Date(auction.route.load.date).getTime() < new Date(body.load_date_from).getTime()) return false
      if (body.load_date_to && new Date(auction.route.load.date).getTime() > new Date(body.load_date_to).getTime()) return false
      if (
        body.price_per_km_from !== undefined &&
        body.price_per_km_from !== null &&
        (auction.main.price_per_km ?? 0) < body.price_per_km_from
      ) {
        return false
      }
      if (
        body.price_per_km_to !== undefined &&
        body.price_per_km_to !== null &&
        (auction.main.price_per_km ?? 0) > body.price_per_km_to
      ) {
        return false
      }
      if (body.unload_city && !includesText(auction.route.unload.city, body.unload_city)) return false
      if (body.unload_date_from && new Date(auction.route.unload.date).getTime() < new Date(body.unload_date_from).getTime()) return false
      if (body.unload_date_to && new Date(auction.route.unload.date).getTime() > new Date(body.unload_date_to).getTime()) return false
      if (body.weight_from !== undefined && body.weight_from !== null && auction.cargo.weight < body.weight_from) return false
      if (body.weight_to !== undefined && body.weight_to !== null && auction.cargo.weight > body.weight_to) return false
      if (body.is_available !== undefined && auction.trading.is_available !== body.is_available) return false
      if (body.is_bidder !== undefined && isAuctionBidder(auction) !== body.is_bidder) return false
      if (body.is_favorite !== undefined && auction.trading.is_favorite !== body.is_favorite) return false

      return true
    })
    const sorted = sortAuctions(filtered, body.sort)

    const total = sorted.length
    const from = total === 0 ? 0 : (page - 1) * perPage + 1
    const to = Math.min(page * perPage, total)

    const response: AuctionListResponse = {
      data: sorted.slice((page - 1) * perPage, page * perPage),
      meta: {
        current_page: page,
        from,
        last_page: Math.max(1, Math.ceil(total / perPage)),
        per_page: perPage,
        to,
        total,
      },
    }

    return HttpResponse.json(response)
  }),
  http.get<{ auctionUuid: string }>("/api/v1/auctions/:auctionUuid", async ({ params }) => {
    await delay(250)

    const auction = auctionDetailMocks[params.auctionUuid]

    if (!auction) {
      return HttpResponse.json(
        {
          code: "resource_not_found",
          title: "Не найдено",
          message: "Аукцион не найден",
        },
        { status: 404 },
      )
    }

    return HttpResponse.json(auction)
  }),
  http.get<{ auctionUuid: string }>("/api/v1/auctions/:auctionUuid/bets", async ({ params }) => {
    await delay(250)

    const bets = auctionBetsMocks[params.auctionUuid]

    if (!bets) {
      return HttpResponse.json(
        {
          code: "resource_not_found",
          title: "Не найдено",
          message: "Ставки аукциона не найдены",
        },
        { status: 404 },
      )
    }

    return HttpResponse.json(bets)
  }),
  http.post<{ auctionUuid: string }>("/api/v1/auctions/:auctionUuid/bets", async ({ params, request }) => {
    await delay(300)

    const auction = auctionDetailMocks[params.auctionUuid]
    const bets = auctionBetsMocks[params.auctionUuid]

    if (!auction || !bets) {
      return HttpResponse.json(
        {
          code: "resource_not_found",
          title: "Не найдено",
          message: "Аукцион не найден",
        },
        { status: 404 },
      )
    }

    if (!auction.trading.can_set_bet) {
      return HttpResponse.json(
        {
          code: "auction_bet_forbidden",
          title: "Ставка недоступна",
          message: "По этому аукциону нельзя сделать ставку",
        },
        { status: 422 },
      )
    }

    const payload: unknown = await request.json().catch(() => ({}))
    const parsed = SetBetRequestSchema.safeParse(payload)

    if (!parsed.success) {
      return HttpResponse.json(
        {
          code: "validation_failed",
          title: "Ошибка валидации",
          message: "Укажите корректную сумму ставки",
        },
        { status: 422 },
      )
    }

    const validationError = validateAuctionBet(auction, parsed.data.price)
    if (validationError) {
      return HttpResponse.json(
        {
          code: "validation_failed",
          title: "Ошибка валидации",
          message: validationError,
        },
        { status: 422 },
      )
    }

    const nextBetId = Math.max(0, ...bets.bets.map((bet) => bet.id)) + 1
    const newBet: BetItem = {
      id: nextBetId,
      created_at: new Date().toISOString(),
      auction_id: auction.main.id,
      subscriber_id: 13,
      contact_name: "Иван Петров",
      contact_phone: "+7 900 000-00-00",
      price_with_vat: parsed.data.price,
      price_no_vat: Number((parsed.data.price / 1.2).toFixed(2)),
      organization_id: 14,
      organization_inn: "9616244307",
      organization_name: "ООО Перевозчик",
      transporter_comment: null,
      is_rejected: false,
      is_counter: false,
      place: 1,
      is_win: false,
      run_number: 0,
      cancel_reason: "",
    }

    bets.bets.unshift(newBet)
    bets.bets.forEach((bet, index) => {
      bet.place = index + 1
    })

    if (auction.trading.price) {
      auction.trading.price.current = parsed.data.price
      auction.trading.price.available = getAvailablePrice(auction.main.auc_type, parsed.data.price, auction.trading.price.step)
    }
    auction.trading.status_mobile = "Leading"
    auction.trading.your = {
      bet: true,
      last_bet: parsed.data.price,
      last_bet_with_vat: parsed.data.price,
      win: false,
    }

    const listAuction = auctionListMock.data.find((item) => item.main.order_uid === params.auctionUuid)
    if (listAuction?.trading.price) {
      listAuction.trading.price.current = parsed.data.price
    }
    if (listAuction) {
      listAuction.trading.status_mobile = "Leading"
    }

    return HttpResponse.json({ ok: true })
  }),
  http.post<{ auctionUuid: string }>("/api/v1/auctions/:auctionUuid/favorite", async ({ params }) => {
    await delay(200)

    const auction = auctionDetailMocks[params.auctionUuid]
    const listAuction = auctionListMock.data.find((item) => item.main.order_uid === params.auctionUuid)

    if (!auction || !listAuction) {
      return HttpResponse.json(
        {
          code: "resource_not_found",
          title: "Не найдено",
          message: "Аукцион не найден",
        },
        { status: 404 },
      )
    }

    const nextFavoriteState = !listAuction.trading.is_favorite
    listAuction.trading.is_favorite = nextFavoriteState
    auction.trading.is_favorite = nextFavoriteState

    return HttpResponse.json({ is_favorite: nextFavoriteState })
  }),
]

function sortAuctions(items: AuctionListItem[], sort: Record<string, "asc" | "desc"> | null | undefined) {
  const [field, direction] = Object.entries(sort ?? {})[0] ?? ["trading.stop_time", "asc"]
  const multiplier = direction === "desc" ? -1 : 1

  return [...items].sort((left, right) => compareAuctionField(left, right, field) * multiplier)
}

function compareAuctionField(left: AuctionListItem, right: AuctionListItem, field: string) {
  if (field === "trading.price.current") {
    return (left.trading.price?.current ?? 0) - (right.trading.price?.current ?? 0)
  }

  if (field === "route.load.date") {
    return new Date(left.route.load.date).getTime() - new Date(right.route.load.date).getTime()
  }

  return new Date(left.trading.stop_time).getTime() - new Date(right.trading.stop_time).getTime()
}

function includesText(value: string, search: string) {
  return value.toLowerCase().includes(search.toLowerCase())
}

function isAuctionBidder(auction: AuctionListItem) {
  return !["NotParticipating", "Unknown"].includes(auction.trading.status_mobile)
}

function getAuctionDistance(auction: AuctionListItem) {
  return getRouteDistanceKm(auction.route.load.city, auction.route.unload.city)
}

function getAvailablePrice(auctionType: AuctionListItem["main"]["auc_type"], current: number, step: number | null | undefined) {
  const priceStep = step ?? 0
  if (auctionType === "Up") return current + priceStep
  if (auctionType === "Down") return Math.max(1, current - priceStep)

  return current
}
