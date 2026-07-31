import { Link } from "@tanstack/react-router";
import { RiArrowLeftLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <Empty className="max-w-md rounded-2xl border border-border bg-card p-8">
        <EmptyHeader>
          <EmptyTitle className="text-foreground">
            Страница не найдена
          </EmptyTitle>
          <EmptyDescription className="text-muted-foreground">
            Проверьте адрес или вернитесь к списку аукционов.
          </EmptyDescription>
        </EmptyHeader>
        <Button
          asChild
          className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link
            search={{
              page: 1,
              per_page: 6,
              sort: "stop_time_asc",
              auc_type: "all",
              status: "all",
            }}
            to="/"
          >
            <RiArrowLeftLine />К списку
          </Link>
        </Button>
      </Empty>
    </main>
  );
}
