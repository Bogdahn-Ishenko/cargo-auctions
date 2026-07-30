import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"

interface AuctionsListErrorStateProps {
  onRetry: () => void
}

export function AuctionsListErrorState({ onRetry }: AuctionsListErrorStateProps) {
  return (
    <Empty className="min-h-64 border">
      <EmptyHeader>
        <EmptyTitle>Не удалось загрузить список</EmptyTitle>
        <EmptyDescription>Проверьте доступность API и повторите запрос.</EmptyDescription>
      </EmptyHeader>
      <Button type="button" variant="outline" onClick={onRetry}>
        Повторить
      </Button>
    </Empty>
  )
}
