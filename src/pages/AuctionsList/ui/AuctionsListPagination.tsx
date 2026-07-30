import { Button } from "@/components/ui/button"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import type { AuctionListResponse } from "@/entities/Auction/model/AuctionList.types"

interface AuctionsListPaginationProps {
  meta: AuctionListResponse["meta"]
  onPageChange: (page: number) => void
  onPageSizeChange: (perPage: number) => void
}

export function AuctionsListPagination({ meta, onPageChange, onPageSizeChange }: AuctionsListPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-900/60 px-5 py-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm text-slate-500">
          Страница {meta.current_page} из {meta.last_page}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500">На странице:</span>
          <NativeSelect
            className="w-20"
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            size="sm"
            value={String(meta.per_page)}
          >
            <NativeSelectOption value="6">6</NativeSelectOption>
            <NativeSelectOption value="10">10</NativeSelectOption>
            <NativeSelectOption value="20">20</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
          type="button"
          variant="outline"
          disabled={meta.current_page <= 1}
          onClick={() => onPageChange(meta.current_page - 1)}
        >
          Назад
        </Button>
        <Button
          className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
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
