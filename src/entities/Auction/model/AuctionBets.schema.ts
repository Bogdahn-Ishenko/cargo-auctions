import { z } from "zod"

export const BetItemSchema = z
  .object({
    id: z.number(),
    created_at: z.string(),
    auction_id: z.number(),
    contact_name: z.string(),
    contact_phone: z.string(),
    price_with_vat: z.number(),
    price_no_vat: z.number(),
    organization_name: z.string(),
    is_rejected: z.boolean(),
    is_counter: z.boolean(),
    place: z.number().nullable().optional(),
    is_win: z.boolean(),
    cancel_reason: z.string(),
  })
  .passthrough()

export const BetListResponseSchema = z
  .object({
    bets: z.array(BetItemSchema),
  })
  .passthrough()

export const SetBetRequestSchema = z.object({
  price: z.number().positive(),
})
