import { z } from "zod"

export const AuctionsListSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  per_page: z.coerce.number().int().positive().catch(20),
  cargo_num: z.string().trim().catch("").optional(),
  is_available: z
    .union([z.literal("true"), z.literal("false"), z.boolean()])
    .transform((value) => (typeof value === "boolean" ? value : value === "true"))
    .optional(),
})

export type AuctionsListSearch = z.infer<typeof AuctionsListSearchSchema>
