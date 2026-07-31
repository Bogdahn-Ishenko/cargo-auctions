import { ApiError } from "@/shared/api/ApiError";

export function getToastErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError) {
    return error.problem.message || error.problem.title || fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
