import type { z } from "zod"
import type {
  AuctionListItemSchema,
  AuctionListRequestSchema,
  AuctionListResponseSchema,
  AuctionStatusSchema,
  AuctionTypeSchema,
  TradingStatusSchema,
} from "./AuctionList.schema"

export type AuctionType = z.infer<typeof AuctionTypeSchema>
export type AuctionStatus = z.infer<typeof AuctionStatusSchema>
export type TradingStatus = z.infer<typeof TradingStatusSchema>
export type AuctionListRequest = z.infer<typeof AuctionListRequestSchema>
export type AuctionListItem = z.infer<typeof AuctionListItemSchema>
export type AuctionListResponse = z.infer<typeof AuctionListResponseSchema>
