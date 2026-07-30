import { delay, http, HttpResponse } from "msw"
import { AuctionListRequestSchema } from "@/entities/Auction/model/AuctionList.schema"
import type { AuctionListResponse } from "@/entities/Auction/model/AuctionList.types"
import { auctionListMock } from "./AuctionList.mock"

export const handlers = [
  http.post("/api/v1/auctions/list", async ({ request }) => {
    await delay(300)
    const payload: unknown = await request.json().catch(() => ({}))
    const body = AuctionListRequestSchema.parse(payload)
    const page = body.page ?? 1
    const perPage = body.per_page ?? 20
    const total = auctionListMock.data.length
    const from = total === 0 ? 0 : (page - 1) * perPage + 1
    const to = Math.min(page * perPage, total)

    const response: AuctionListResponse = {
      data: auctionListMock.data.slice((page - 1) * perPage, page * perPage),
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
]
