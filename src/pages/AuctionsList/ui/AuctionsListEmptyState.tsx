import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"

export function AuctionsListEmptyState() {
  return (
    <Empty className="min-h-64 border">
      <EmptyHeader>
        <EmptyTitle>Аукционов нет</EmptyTitle>
        <EmptyDescription>По текущему запросу список пуст.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
