import { AuctionTypeSchema } from "@/entities/Auction/model/AuctionList.schema"
import { z } from "zod"

export const AuctionsListSortSchema = z.enum(["stop_time_asc", "price_asc", "price_desc", "load_date_asc"])
export const AuctionsListTypeSearchSchema = z.union([AuctionTypeSchema, z.literal("all")])

export const AuctionsListSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  per_page: z.coerce.number().int().positive().catch(6),
  sort: AuctionsListSortSchema.catch("stop_time_asc"),
  auc_type: AuctionsListTypeSearchSchema.catch("all"),
  cargo_num: z.string().trim().catch("").optional(),
  is_available: z
    .union([z.literal("true"), z.literal("false"), z.boolean()])
    .transform((value) => (typeof value === "boolean" ? value : value === "true"))
    .optional(),
})

export type AuctionsListSort = z.infer<typeof AuctionsListSortSchema>
export type AuctionsListTypeSearch = z.infer<typeof AuctionsListTypeSearchSchema>
export type AuctionsListSearch = z.infer<typeof AuctionsListSearchSchema>
