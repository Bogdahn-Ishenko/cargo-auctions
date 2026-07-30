import { useEffect, useState, type PropsWithChildren } from "react"

export function MswProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(!import.meta.env.DEV)

  useEffect(() => {
    if (!import.meta.env.DEV) return

    void import("@/shared/api/msw/Browser").then(({ worker }) =>
      worker.start({ onUnhandledRequest: "bypass" }).then(() => setIsReady(true)),
    )
  }, [])

  if (!isReady) return null

  return children
}
