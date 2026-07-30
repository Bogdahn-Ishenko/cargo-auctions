import { z } from "zod"

export const AuctionsListSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  per_page: z.coerce.number().int().positive().catch(20),
})

export type AuctionsListSearch = z.infer<typeof AuctionsListSearchSchema>
