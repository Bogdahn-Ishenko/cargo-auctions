import type { z } from "zod"
import type { BetItemSchema, BetListResponseSchema, SetBetRequestSchema } from "./AuctionBets.schema"

export type BetItem = z.infer<typeof BetItemSchema>
export type BetListResponse = z.infer<typeof BetListResponseSchema>
export type SetBetRequest = z.infer<typeof SetBetRequestSchema>
