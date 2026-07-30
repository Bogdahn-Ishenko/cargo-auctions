import { setupWorker } from "msw/browser"
import { handlers } from "./Handlers"

export const worker = setupWorker(...handlers)
