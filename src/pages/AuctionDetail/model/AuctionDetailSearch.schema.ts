import { z } from "zod"

const BooleanSearchSchema = z
  .union([z.literal("true"), z.literal("false"), z.boolean()])
  .transform((value) => (typeof value === "boolean" ? value : value === "true"))

export const AuctionDetailSearchSchema = z.object({
  bet: BooleanSearchSchema.catch(false),
})

export type AuctionDetailSearch = z.infer<typeof AuctionDetailSearchSchema>
