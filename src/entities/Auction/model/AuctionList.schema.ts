import { z } from "zod"

export const AuctionTypeSchema = z.enum(["Request", "Up", "Down", "FixPrice", "Unknown"])

export const AuctionStatusSchema = z.enum([
  "Planning",
  "Auction",
  "DeterminateWinner",
  "WaitDeal",
  "InProgress",
  "Finished",
  "Stopped",
  "Canceled",
  "Unknown",
])

export const TradingStatusSchema = z.enum([
  "NotParticipating",
  "Leading",
  "Losing",
  "OnPending",
  "Confirmed",
  "ChoosingWinner",
  "Winner",
  "Accepted",
  "Unknown",
])

export const AuctionListRequestSchema = z
  .object({
    page: z.number().int().positive().optional(),
    per_page: z.number().int().positive().optional(),
    cargo_num: z.string().trim().optional(),
    is_available: z.boolean().optional(),
    sort: z.record(z.string(), z.enum(["asc", "desc"])).nullable().optional(),
  })
  .passthrough()

const AuctionListItemRoutePointSchema = z
  .object({
    city: z.string(),
    address: z.string(),
    date: z.string(),
    city_gc_id: z.number(),
    points_count: z.number(),
  })
  .passthrough()

export const AuctionListItemSchema = z
  .object({
    main: z
      .object({
        id: z.number(),
        cargo_num: z.string(),
        cargo_date: z.string(),
        auc_type: AuctionTypeSchema,
        order_uid: z.string(),
        created_at: z.string(),
        priority_sort: z.number(),
        is_assembly: z.boolean(),
        price_per_km: z.number().nullable().optional(),
      })
      .passthrough(),
    organizer: z
      .object({
        organization_name: z.string(),
      })
      .passthrough(),
    route: z
      .object({
        load: AuctionListItemRoutePointSchema,
        unload: AuctionListItemRoutePointSchema,
      })
      .passthrough(),
    cargo: z
      .object({
        name: z.string(),
        weight: z.number(),
        volume: z.number(),
        body_type: z.string(),
        truck_count: z.number(),
        is_cargo: z.boolean(),
      })
      .passthrough(),
    trading: z
      .object({
        status: AuctionStatusSchema,
        status_mobile: TradingStatusSchema,
        start_time: z.string(),
        stop_time: z.string(),
        can_set_bet: z.boolean(),
        is_available: z.boolean(),
        is_favorite: z.boolean(),
        price: z
          .object({
            start: z.number(),
            current: z.number(),
            current_no_vat: z.number(),
          })
          .passthrough()
          .nullable()
          .optional(),
      })
      .passthrough(),
    payment: z
      .object({
        form: z.string(),
        currency_code: z.string(),
      })
      .passthrough(),
  })
  .passthrough()

export const AuctionListResponseSchema = z
  .object({
    data: z.array(AuctionListItemSchema),
    meta: z
      .object({
        current_page: z.number(),
        from: z.number(),
        last_page: z.number(),
        per_page: z.number(),
        to: z.number(),
        total: z.number(),
      })
      .passthrough(),
  })
  .passthrough()
