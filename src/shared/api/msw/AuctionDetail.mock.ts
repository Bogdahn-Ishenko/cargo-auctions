import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types"
import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types"
import { auctionListMock } from "./AuctionList.mock"

export const auctionDetailMocks: Record<string, AuctionDetailResponse> = Object.fromEntries(
  auctionListMock.data.map((auction) => [auction.main.order_uid, createAuctionDetail(auction)]),
)

function createAuctionDetail(auction: AuctionListItem): AuctionDetailResponse {
  return {
    main: auction.main,
    organizer: auction.organizer,
    contacts: auction.trading.can_set_bet
      ? [
          {
            name: "Иван Петров",
            phone: "+7 900 000-00-00",
            email: "ivan.petrov@example.com",
          },
        ]
      : [],
    cargo: {
      ...auction.cargo,
      price: String(auction.trading.price?.current ?? 0),
      distance: auction.main.price_per_km && auction.trading.price?.current
        ? Math.round(auction.trading.price.current / auction.main.price_per_km)
        : null,
    },
    trading: {
      ...auction.trading,
      hide_bets_history: !auction.trading.can_set_bet,
      hide_places: false,
      no_view_cargo_price: false,
      hide_points_address_and_contacts: !auction.trading.can_set_bet,
      price: auction.trading.price
        ? {
            current: auction.trading.price.current,
            min: Math.max(1, Math.round(auction.trading.price.current * 0.85)),
            max: Math.round(auction.trading.price.current * 1.15),
            step: getStep(auction.trading.price.current),
            price_per_km: auction.main.price_per_km,
          }
        : null,
    },
    payment: {
      form: auction.payment.form,
      delay_days: auction.payment.form.includes("с НДС") ? 10 : null,
      vat_rate: auction.payment.form.includes("с НДС") ? "20" : null,
    },
    routes: [
      {
        row_num: 1,
        op_type: "Loading",
        start_date: auction.route.load.date,
        end_date: auction.route.load.date,
        location: {
          city_name: auction.route.load.city,
          loading_address: auction.route.load.address,
        },
        cargo: {
          name: auction.cargo.name,
          weight: String(auction.cargo.weight),
          volume: String(auction.cargo.volume),
        },
        contact: auction.trading.can_set_bet
          ? {
              name: "Иван Петров",
              phone: "+7 900 000-00-00",
            }
          : undefined,
      },
      {
        row_num: 2,
        op_type: "Unloading",
        start_date: auction.route.unload.date,
        end_date: auction.route.unload.date,
        location: {
          city_name: auction.route.unload.city,
          loading_address: auction.route.unload.address,
        },
        cargo: {
          name: auction.cargo.name,
          weight: String(auction.cargo.weight),
          volume: String(auction.cargo.volume),
        },
      },
    ],
  }
}

function getStep(price: number) {
  if (price >= 100000) return 1000
  if (price >= 50000) return 500

  return 250
}
