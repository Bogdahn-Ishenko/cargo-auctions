import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AuctionsListSkeleton() {
  return (
    <div className="grid max-w-[1100px] gap-4 xl:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <AuctionListRowSkeleton key={index} />
      ))}
    </div>
  );
}

function AuctionListRowSkeleton() {
  return (
    <Card className="relative gap-0 overflow-hidden rounded-2xl border-border bg-card py-0 shadow-sm">
      <div className="absolute bottom-0 left-0 top-0 w-1 bg-border" />
      <CardContent className="grid gap-4 p-5 pl-6 lg:grid-cols-[minmax(0,1fr)_190px]">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-1.5 h-3 w-44 max-w-full" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-5 w-14 rounded-4xl" />
              <Skeleton className="h-5 w-20 rounded-4xl" />
              <Skeleton className="h-5 w-24 rounded-4xl" />
            </div>
          </div>

          <div className="my-4">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="size-2.5 shrink-0 rounded-full" />
              <div className="relative flex flex-1 items-center">
                <Skeleton className="h-px w-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              </div>
              <Skeleton className="size-2.5 shrink-0 rounded-full" />
            </div>
            <div className="flex justify-between gap-4">
              <div className="min-w-0">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="mt-1.5 h-3 w-20" />
              </div>
              <div className="flex min-w-0 flex-col items-end">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="mt-1.5 h-3 w-20" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-5 w-12 rounded-md" />
            <Skeleton className="h-5 w-14 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 rounded-xl border border-border bg-muted p-3">
          <div>
            <Skeleton className="mb-2 h-3 w-20" />
            <Skeleton className="h-7 w-32" />
            <div className="mt-3 grid gap-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-8 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}
