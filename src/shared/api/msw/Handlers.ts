import { delay, http, HttpResponse } from "msw"
import { auctionListMock } from "./AuctionList.mock"

export const handlers = [
  http.post("/api/v1/auctions/list", async () => {
    await delay(300)

    return HttpResponse.json(auctionListMock)
  }),
]
