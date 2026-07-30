import type { AuctionListResponse } from "@/entities/Auction/model/AuctionList.types"

export const auctionListMock: AuctionListResponse = {
  data: [
    {
      main: {
        id: 1,
        cargo_num: "00000001059",
        cargo_date: "2026-05-04T14:49:09",
        auc_type: "Down",
        order_uid: "3a05d045-0e67-4f85-b20a-de81d18bba7a",
        created_at: "2026-05-25T11:48:20",
        priority_sort: 0,
        is_assembly: false,
        price_per_km: 199,
      },
      organizer: {
        organization_name: "ЛИМ",
      },
      route: {
        load: {
          city: "Пермь",
          address: "Транспортная 9",
          date: "2026-05-26T09:00:00",
          city_gc_id: 59,
          points_count: 1,
        },
        unload: {
          city: "Москва",
          address: "Складская 12",
          date: "2026-05-27T09:00:00",
          city_gc_id: 100,
          points_count: 1,
        },
      },
      cargo: {
        name: "Мороженое",
        weight: 1,
        volume: 1,
        body_type: "тентованный",
        truck_count: 1,
        is_cargo: true,
      },
      trading: {
        status: "Auction",
        status_mobile: "NotParticipating",
        start_time: "2026-05-26T09:00:00",
        stop_time: "2026-05-26T18:00:00",
        can_set_bet: true,
        is_available: true,
        is_favorite: false,
        price: {
          start: 30000,
          current: 30000,
          current_no_vat: 25000,
        },
      },
      payment: {
        form: "Безналичная с НДС",
        currency_code: "643",
      },
    },
    {
      main: {
        id: 2,
        cargo_num: "00000001060",
        cargo_date: "2026-05-05T10:00:00",
        auc_type: "Request",
        order_uid: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        created_at: "2026-05-25T12:10:00",
        priority_sort: 1,
        is_assembly: false,
        price_per_km: null,
      },
      organizer: {
        organization_name: "Тестовый заказчик",
      },
      route: {
        load: {
          city: "Казань",
          address: "Промышленная 4",
          date: "2026-05-28T08:00:00",
          city_gc_id: 16,
          points_count: 1,
        },
        unload: {
          city: "Екатеринбург",
          address: "Логистическая 20",
          date: "2026-05-29T08:00:00",
          city_gc_id: 66,
          points_count: 1,
        },
      },
      cargo: {
        name: "Оборудование",
        weight: 8,
        volume: 42,
        body_type: "фургон",
        truck_count: 1,
        is_cargo: true,
      },
      trading: {
        status: "Planning",
        status_mobile: "Unknown",
        start_time: "2026-05-28T09:00:00",
        stop_time: "2026-05-28T18:00:00",
        can_set_bet: false,
        is_available: false,
        is_favorite: true,
        price: null,
      },
      payment: {
        form: "Безналичная без НДС",
        currency_code: "643",
      },
    },
  ],
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 20,
    to: 2,
    total: 2,
  },
}
