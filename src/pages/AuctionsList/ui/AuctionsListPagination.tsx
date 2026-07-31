import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AuctionListResponse } from "@/entities/Auction/model/AuctionList.types";

interface AuctionsListPaginationProps {
  meta: AuctionListResponse["meta"];
  onPageChange: (page: number) => void;
  onPageSizeChange: (perPage: number) => void;
}

export function AuctionsListPagination({
  meta,
  onPageChange,
  onPageSizeChange,
}: AuctionsListPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-5 py-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm text-muted-foreground">
          Страница {meta.current_page} из {meta.last_page}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground">
            На странице:
          </span>
          <Select
            onValueChange={(value) => onPageSizeChange(Number(value))}
            value={String(meta.per_page)}
          >
            <SelectTrigger
              className="w-20 border-border bg-card text-foreground focus-visible:border-ring"
              size="sm"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="border-border bg-card text-foreground hover:bg-muted"
          type="button"
          variant="outline"
          disabled={meta.current_page <= 1}
          onClick={() => onPageChange(meta.current_page - 1)}
        >
          Назад
        </Button>
        <Button
          className="border-border bg-card text-foreground hover:bg-muted"
          type="button"
          variant="outline"
          disabled={meta.current_page >= meta.last_page}
          onClick={() => onPageChange(meta.current_page + 1)}
        >
          Вперед
        </Button>
      </div>
    </div>
  );
}
