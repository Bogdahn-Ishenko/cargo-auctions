import type { AuctionStatus, AuctionType, TradingStatus } from "@/entities/Auction/model/AuctionList.types"

export function getAuctionTypeLabel(type: AuctionType) {
  const labels: Record<AuctionType, string> = {
    Request: "Заявка",
    Up: "Повышение",
    Down: "Понижение",
    FixPrice: "Фикс",
    Unknown: "Тип не указан",
  }

  return labels[type]
}

export function getAuctionStatusLabel(status: AuctionStatus) {
  const labels: Record<AuctionStatus, string> = {
    Planning: "Планируется",
    Auction: "Активно",
    DeterminateWinner: "Выбор победителя",
    WaitDeal: "Ожидает сделки",
    InProgress: "В работе",
    Finished: "Завершено",
    Stopped: "Остановлено",
    Canceled: "Отменено",
    Unknown: "Статус не указан",
  }

  return labels[status]
}

export function getTradingStatusLabel(status: TradingStatus) {
  const labels: Record<TradingStatus, string> = {
    NotParticipating: "Не участвуете",
    Leading: "Вы лидируете",
    Losing: "Вас обогнали",
    OnPending: "На рассмотрении",
    Confirmed: "Подтверждено",
    ChoosingWinner: "Выбор победителя",
    Winner: "Победа",
    Accepted: "Принято",
    Unknown: "Без участия",
  }

  return labels[status]
}
