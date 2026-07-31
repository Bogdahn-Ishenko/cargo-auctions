import type { AuctionListRequest } from "@/entities/Auction/model/AuctionList.types"
import type { AuctionsListSearch, AuctionsListSort } from "./AuctionsListSearch.schema"

export function buildAuctionsListRequest(search: AuctionsListSearch): AuctionListRequest {
  return {
    page: search.page,
    per_page: search.per_page,
    sort: getApiSort(search.sort),
    ...(search.auc_type === "all" ? {} : { auc_type: [search.auc_type] }),
    ...(search.status === "all" ? {} : { status: [search.status] }),
    ...(search.cargo_num ? { cargo_num: search.cargo_num } : {}),
    ...(search.current_price_from ? { current_price_from: search.current_price_from } : {}),
    ...(search.current_price_to ? { current_price_to: search.current_price_to } : {}),
    ...(search.load_city ? { load_city: search.load_city } : {}),
    ...(search.load_date_from ? { load_date_from: toApiDateTime(search.load_date_from, "from") } : {}),
    ...(search.load_date_to ? { load_date_to: toApiDateTime(search.load_date_to, "to") } : {}),
    ...(search.price_per_km_from ? { price_per_km_from: search.price_per_km_from } : {}),
    ...(search.price_per_km_to ? { price_per_km_to: search.price_per_km_to } : {}),
    ...(search.unload_city ? { unload_city: search.unload_city } : {}),
    ...(search.unload_date_from ? { unload_date_from: toApiDateTime(search.unload_date_from, "from") } : {}),
    ...(search.unload_date_to ? { unload_date_to: toApiDateTime(search.unload_date_to, "to") } : {}),
    ...(search.weight_from ? { weight_from: search.weight_from } : {}),
    ...(search.weight_to ? { weight_to: search.weight_to } : {}),
    ...(search.is_available === undefined ? {} : { is_available: search.is_available }),
    ...(search.is_bidder === undefined ? {} : { is_bidder: search.is_bidder }),
    ...(search.is_favorite === undefined ? {} : { is_favorite: search.is_favorite }),
  }
}

function getApiSort(sort: AuctionsListSort): AuctionListRequest["sort"] {
  const sortMap: Record<AuctionsListSort, NonNullable<AuctionListRequest["sort"]>> = {
    stop_time_asc: { "trading.stop_time": "asc" },
    price_asc: { "trading.price.current": "asc" },
    price_desc: { "trading.price.current": "desc" },
    load_date_asc: { "route.load.date": "asc" },
  }

  return sortMap[sort]
}

function toApiDateTime(date: string, boundary: "from" | "to") {
  const time = boundary === "from" ? "00:00:00" : "23:59:59"

  return `${date}T${time}+03:00`
}
