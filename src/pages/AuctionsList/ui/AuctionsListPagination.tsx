import { Button } from "@/components/ui/button"
import type { AuctionListResponse } from "@/entities/Auction/model/AuctionList.types"

interface AuctionsListPaginationProps {
  meta: AuctionListResponse["meta"]
  onPageChange: (page: number) => void
}

export function AuctionsListPagination({ meta, onPageChange }: AuctionsListPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-muted-foreground">
        Страница {meta.current_page} из {meta.last_page}
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={meta.current_page <= 1}
          onClick={() => onPageChange(meta.current_page - 1)}
        >
          Назад
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={meta.current_page >= meta.last_page}
          onClick={() => onPageChange(meta.current_page + 1)}
        >
          Вперед
        </Button>
      </div>
    </div>
  )
}
