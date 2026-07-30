import type { z } from "zod"
import type { BetItemSchema, BetListResponseSchema } from "./AuctionBets.schema"

export type BetItem = z.infer<typeof BetItemSchema>
export type BetListResponse = z.infer<typeof BetListResponseSchema>
