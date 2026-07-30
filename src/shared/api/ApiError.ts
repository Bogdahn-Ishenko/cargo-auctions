import { z } from "zod"

export const ProblemDetailSchema = z
  .object({
    code: z.string(),
    title: z.string(),
    message: z.string(),
    trace_id: z.string().nullable().optional(),
  })
  .passthrough()

export type ProblemDetail = z.infer<typeof ProblemDetailSchema>

export interface ApiErrorOptions {
  status: number
  problem: ProblemDetail
}

export class ApiError extends Error {
  readonly status: number
  readonly problem: ProblemDetail

  constructor({ status, problem }: ApiErrorOptions) {
    super(problem.message || problem.title)
    this.name = "ApiError"
    this.status = status
    this.problem = problem
  }
}
