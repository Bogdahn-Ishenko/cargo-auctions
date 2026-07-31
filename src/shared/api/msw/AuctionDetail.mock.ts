import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types"
import type { AuctionListItem } from "@/entities/Auction/model/AuctionList.types"
import { auctionListMock } from "./AuctionList.mock"

export const auctionDetailMocks: Record<string, AuctionDetailResponse> = Object.fromEntries(
  auctionListMock.data.map((auction) => [auction.main.order_uid, createAuctionDetail(auction)]),
)

function createAuctionDetail(auction: AuctionListItem): AuctionDetailResponse {
  const yourLastBet = getYourLastBet(auction)

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
      car: {
        type: auction.cargo.body_type,
        weight: auction.cargo.weight,
        volume: auction.cargo.volume,
        width: 2.45,
        length: 13.6,
        height: 2.7,
      },
    },
    trading: {
      ...auction.trading,
      hide_bets_history: !auction.trading.can_set_bet,
      hide_places: auction.main.id % 4 === 0,
      no_view_cargo_price: auction.main.id % 5 === 0,
      hide_points_address_and_contacts: !auction.trading.can_set_bet,
      price: auction.trading.price
        ? {
            current: auction.trading.price.current,
            available: getAvailablePrice(auction),
            min: Math.max(1, Math.round(auction.trading.price.current * 0.85)),
            max: Math.round(auction.trading.price.current * 1.15),
            step: getStep(auction.trading.price.current),
            price_per_km: auction.main.price_per_km,
          }
        : null,
      your: {
        bet: isBidder(auction),
        last_bet: yourLastBet,
        last_bet_with_vat: yourLastBet,
        win: auction.trading.status_mobile === "Winner",
      },
      settings: {
        prolong_after_bet: 10,
        winner_confirm: 1,
        transmission_time_in: 24,
      },
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

function getAvailablePrice(auction: AuctionListItem) {
  const current = auction.trading.price?.current
  if (!current) return null

  const step = getStep(current)
  if (auction.main.auc_type === "Up") return current + step
  if (auction.main.auc_type === "Down") return Math.max(1, current - step)

  return current
}

function isBidder(auction: AuctionListItem) {
  return !["NotParticipating", "Unknown"].includes(auction.trading.status_mobile)
}

function getYourLastBet(auction: AuctionListItem) {
  if (!isBidder(auction)) return null

  const current = auction.trading.price?.current
  if (!current) return null

  const step = getStep(current)
  if (auction.trading.status_mobile !== "Losing") return current

  if (auction.main.auc_type === "Up") return Math.max(1, current - step)
  if (auction.main.auc_type === "Down") return current + step

  return Math.max(1, current - step)
}
