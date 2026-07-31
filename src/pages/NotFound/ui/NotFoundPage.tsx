import { Link } from "@tanstack/react-router"
import { RiArrowLeftLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100">
      <Empty className="max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <EmptyHeader>
          <EmptyTitle className="text-slate-100">Страница не найдена</EmptyTitle>
          <EmptyDescription className="text-slate-500">
            Проверьте адрес или вернитесь к списку аукционов.
          </EmptyDescription>
        </EmptyHeader>
        <Button asChild className="mt-4 bg-blue-600 text-white hover:bg-blue-700">
          <Link search={{ page: 1, per_page: 6, sort: "stop_time_asc", auc_type: "all", status: "all" }} to="/">
            <RiArrowLeftLine />
            К списку
          </Link>
        </Button>
      </Empty>
    </main>
  )
}
