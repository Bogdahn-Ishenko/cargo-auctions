import type { AuctionDetailResponse } from "@/entities/Auction/model/AuctionDetail.types"
import { auctionListMock } from "./AuctionList.mock"

const firstAuction = auctionListMock.data[0]!
const secondAuction = auctionListMock.data[1]!

export const auctionDetailMocks: Record<string, AuctionDetailResponse> = {
  [firstAuction.main.order_uid]: {
    main: firstAuction.main,
    organizer: firstAuction.organizer,
    contacts: [
      {
        name: "Иван Петров",
        phone: "+7 900 000-00-00",
        email: "ivan.petrov@example.com",
      },
    ],
    cargo: {
      ...firstAuction.cargo,
      price: "30000",
      distance: 151,
    },
    trading: {
      ...firstAuction.trading,
      hide_bets_history: false,
      hide_places: false,
      no_view_cargo_price: false,
      hide_points_address_and_contacts: false,
      price: {
        current: 30000,
        min: 26000,
        max: 34000,
        step: 500,
        price_per_km: 199,
      },
    },
    payment: {
      form: firstAuction.payment.form,
      delay_days: 10,
      vat_rate: "20",
    },
    routes: [
      {
        row_num: 1,
        op_type: "Loading",
        start_date: firstAuction.route.load.date,
        end_date: firstAuction.route.load.date,
        location: {
          city_name: firstAuction.route.load.city,
          loading_address: firstAuction.route.load.address,
        },
        cargo: {
          name: firstAuction.cargo.name,
          weight: String(firstAuction.cargo.weight),
          volume: String(firstAuction.cargo.volume),
        },
        contact: {
          name: "Иван Петров",
          phone: "+7 900 000-00-00",
        },
      },
      {
        row_num: 2,
        op_type: "Unloading",
        start_date: firstAuction.route.unload.date,
        end_date: firstAuction.route.unload.date,
        location: {
          city_name: firstAuction.route.unload.city,
          loading_address: firstAuction.route.unload.address,
        },
        cargo: {
          name: firstAuction.cargo.name,
          weight: String(firstAuction.cargo.weight),
          volume: String(firstAuction.cargo.volume),
        },
      },
    ],
  },
  [secondAuction.main.order_uid]: {
    main: secondAuction.main,
    organizer: secondAuction.organizer,
    contacts: [],
    cargo: {
      ...secondAuction.cargo,
      price: "0",
      distance: 940,
    },
    trading: {
      ...secondAuction.trading,
      hide_bets_history: true,
      hide_places: true,
      no_view_cargo_price: false,
      hide_points_address_and_contacts: true,
      price: null,
    },
    payment: {
      form: secondAuction.payment.form,
      delay_days: null,
      vat_rate: null,
    },
    routes: [
      {
        row_num: 1,
        op_type: "Loading",
        start_date: secondAuction.route.load.date,
        end_date: secondAuction.route.load.date,
        location: {
          city_name: secondAuction.route.load.city,
          loading_address: secondAuction.route.load.address,
        },
        cargo: {
          name: secondAuction.cargo.name,
          weight: String(secondAuction.cargo.weight),
          volume: String(secondAuction.cargo.volume),
        },
      },
      {
        row_num: 2,
        op_type: "Unloading",
        start_date: secondAuction.route.unload.date,
        end_date: secondAuction.route.unload.date,
        location: {
          city_name: secondAuction.route.unload.city,
          loading_address: secondAuction.route.unload.address,
        },
        cargo: {
          name: secondAuction.cargo.name,
          weight: String(secondAuction.cargo.weight),
          volume: String(secondAuction.cargo.volume),
        },
      },
    ],
  },
}
