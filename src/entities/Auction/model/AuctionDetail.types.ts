import type { z } from "zod"
import type { AuctionDetailResponseSchema, AuctionDetailRoutePointSchema } from "./AuctionDetail.schema"

export type AuctionDetailRoutePoint = z.infer<typeof AuctionDetailRoutePointSchema>
export type AuctionDetailResponse = z.infer<typeof AuctionDetailResponseSchema>
