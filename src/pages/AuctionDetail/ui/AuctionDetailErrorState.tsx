import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"

interface AuctionDetailErrorStateProps {
  onRetry: () => void
}

export function AuctionDetailErrorState({ onRetry }: AuctionDetailErrorStateProps) {
  return (
    <Empty className="min-h-64 border">
      <EmptyHeader>
        <EmptyTitle>Аукцион не найден</EmptyTitle>
        <EmptyDescription>Проверьте ссылку или вернитесь к списку.</EmptyDescription>
      </EmptyHeader>
      <Button type="button" variant="outline" onClick={onRetry}>
        Повторить
      </Button>
    </Empty>
  )
}
