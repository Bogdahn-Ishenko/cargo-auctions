import { useEffect, useState, type PropsWithChildren } from "react"

const isMswEnabled = import.meta.env.VITE_ENABLE_MSW !== "false"

export function MswProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(!isMswEnabled)

  useEffect(() => {
    if (!isMswEnabled) return

    void import("@/shared/api/msw/Browser").then(({ worker }) =>
      worker.start({ onUnhandledRequest: "bypass" }).then(() => setIsReady(true)),
    )
  }, [])

  if (!isReady) return null

  return children
}
