import { z } from "zod"
import { AuctionStatusSchema, AuctionTypeSchema, TradingStatusSchema } from "./AuctionList.schema"

export const AuctionRouteOperationSchema = z.enum(["Loading", "Unloading", "Unknown"])

export const AuctionDetailRoutePointSchema = z
  .object({
    row_num: z.number(),
    op_type: AuctionRouteOperationSchema,
    start_date: z.string(),
    end_date: z.string(),
    location: z
      .object({
        city_name: z.string(),
        loading_address: z.string(),
      })
      .passthrough(),
    cargo: z
      .object({
        name: z.string(),
        weight: z.string(),
        volume: z.string(),
      })
      .passthrough(),
    contact: z
      .object({
        name: z.string().nullable().optional(),
        phone: z.string().nullable().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough()

export const AuctionDetailResponseSchema = z
  .object({
    main: z
      .object({
        id: z.number(),
        cargo_num: z.string(),
        cargo_date: z.string(),
        auc_type: AuctionTypeSchema,
        order_uid: z.string(),
        created_at: z.string(),
      })
      .passthrough(),
    organizer: z
      .object({
        organization_name: z.string(),
      })
      .passthrough(),
    contacts: z
      .array(
        z
          .object({
            name: z.string().nullable().optional(),
            phone: z.string().nullable().optional(),
            email: z.string().nullable().optional(),
          })
          .passthrough(),
      )
      .optional(),
    cargo: z
      .object({
        name: z.string().optional(),
        price: z.string().optional(),
        distance: z.number().nullable().optional(),
        truck_count: z.number(),
        body_type: z.string(),
        weight: z.number().optional(),
        volume: z.number().optional(),
        car: z
          .object({
            type: z.string().nullable().optional(),
            weight: z.number().nullable().optional(),
            volume: z.number().nullable().optional(),
            width: z.number().nullable().optional(),
            length: z.number().nullable().optional(),
            height: z.number().nullable().optional(),
          })
          .passthrough()
          .optional(),
      })
      .passthrough(),
    trading: z
      .object({
        status: AuctionStatusSchema,
        status_mobile: TradingStatusSchema,
        start_time: z.string(),
        stop_time: z.string(),
        can_set_bet: z.boolean(),
        hide_bets_history: z.boolean().optional(),
        hide_places: z.boolean().optional(),
        no_view_cargo_price: z.boolean().optional(),
        hide_points_address_and_contacts: z.boolean().optional(),
        price: z
          .object({
            current: z.number().nullable().optional(),
            available: z.number().nullable().optional(),
            min: z.number().nullable().optional(),
            max: z.number().nullable().optional(),
            step: z.number().nullable().optional(),
            price_per_km: z.number().nullable().optional(),
          })
          .passthrough()
          .nullable()
          .optional(),
        your: z
          .object({
            bet: z.boolean(),
            last_bet: z.number().nullable().optional(),
            last_bet_with_vat: z.number().nullable().optional(),
            win: z.boolean(),
          })
          .passthrough()
          .optional(),
        settings: z
          .object({
            prolong_after_bet: z.number().nullable().optional(),
            winner_confirm: z.number().nullable().optional(),
            transmission_time_in: z.number().nullable().optional(),
          })
          .passthrough()
          .optional(),
      })
      .passthrough(),
    payment: z
      .object({
        form: z.string(),
        delay_days: z.number().nullable().optional(),
        vat_rate: z.string().nullable().optional(),
      })
      .passthrough(),
    routes: z.array(AuctionDetailRoutePointSchema),
  })
  .passthrough()
