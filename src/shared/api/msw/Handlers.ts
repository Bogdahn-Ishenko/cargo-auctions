import { delay, http, HttpResponse } from "msw"
import { AuctionListRequestSchema } from "@/entities/Auction/model/AuctionList.schema"
import type { AuctionListResponse } from "@/entities/Auction/model/AuctionList.types"
import { auctionBetsMocks } from "./AuctionBets.mock"
import { auctionDetailMocks } from "./AuctionDetail.mock"
import { auctionListMock } from "./AuctionList.mock"

export const handlers = [
  http.post("/api/v1/auctions/list", async ({ request }) => {
    await delay(300)
    const payload: unknown = await request.json().catch(() => ({}))
    const body = AuctionListRequestSchema.parse(payload)
    const page = body.page ?? 1
    const perPage = body.per_page ?? 20

    const filtered = auctionListMock.data.filter((auction) => {
      if (body.cargo_num && !auction.main.cargo_num.includes(body.cargo_num)) return false
      if (body.is_available !== undefined && auction.trading.is_available !== body.is_available) return false

      return true
    })

    const total = filtered.length
    const from = total === 0 ? 0 : (page - 1) * perPage + 1
    const to = Math.min(page * perPage, total)

    const response: AuctionListResponse = {
      data: filtered.slice((page - 1) * perPage, page * perPage),
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
]
