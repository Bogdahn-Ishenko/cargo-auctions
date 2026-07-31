import { AuctionTypeSchema, TradingStatusSchema } from "@/entities/Auction/model/AuctionList.schema"
import { z } from "zod"

export const AuctionsListSortSchema = z.enum(["stop_time_asc", "price_asc", "price_desc", "load_date_asc"])
export const AuctionsListTypeSearchSchema = z.union([AuctionTypeSchema, z.literal("all")])
export const AuctionsListTradingStatusSearchSchema = z.union([TradingStatusSchema, z.literal("all")])

export const AuctionsListSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  per_page: z.coerce.number().int().positive().catch(6),
  sort: AuctionsListSortSchema.catch("stop_time_asc"),
  auc_type: AuctionsListTypeSearchSchema.catch("all"),
  status: AuctionsListTradingStatusSearchSchema.catch("all"),
  cargo_num: z.string().trim().catch("").optional(),
  current_price_from: z.coerce.number().nonnegative().catch(0).optional(),
  current_price_to: z.coerce.number().nonnegative().catch(0).optional(),
  load_city: z.string().trim().catch("").optional(),
  load_date_from: z.string().trim().catch("").optional(),
  load_date_to: z.string().trim().catch("").optional(),
  price_per_km_from: z.coerce.number().nonnegative().catch(0).optional(),
  price_per_km_to: z.coerce.number().nonnegative().catch(0).optional(),
  unload_city: z.string().trim().catch("").optional(),
  unload_date_from: z.string().trim().catch("").optional(),
  unload_date_to: z.string().trim().catch("").optional(),
  weight_from: z.coerce.number().nonnegative().catch(0).optional(),
  weight_to: z.coerce.number().nonnegative().catch(0).optional(),
  is_available: z
    .union([z.literal("true"), z.literal("false"), z.boolean()])
    .transform((value) => (typeof value === "boolean" ? value : value === "true"))
    .optional(),
  is_bidder: z
    .union([z.literal("true"), z.literal("false"), z.boolean()])
    .transform((value) => (typeof value === "boolean" ? value : value === "true"))
    .optional(),
  is_favorite: z
    .union([z.literal("true"), z.literal("false"), z.boolean()])
    .transform((value) => (typeof value === "boolean" ? value : value === "true"))
    .optional(),
})

export type AuctionsListSort = z.infer<typeof AuctionsListSortSchema>
export type AuctionsListTradingStatusSearch = z.infer<typeof AuctionsListTradingStatusSearchSchema>
export type AuctionsListTypeSearch = z.infer<typeof AuctionsListTypeSearchSchema>
export type AuctionsListSearch = z.infer<typeof AuctionsListSearchSchema>
