import { ApiError, ProblemDetailSchema } from "./ApiError"

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: unknown
  query?: Record<string, unknown>
  signal?: AbortSignal
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "/api/v1"

function serializeQueryValue(value: unknown): string | null {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }

  return null
}

export function buildQueryString(query?: Record<string, unknown>): string {
  if (!query) return ""

  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined) return

    if (Array.isArray(value)) {
      value.forEach((item) => {
        const serialized = serializeQueryValue(item)
        if (serialized !== null) searchParams.append(key, serialized)
      })
      return
    }

    const serialized = serializeQueryValue(value)
    if (serialized !== null) searchParams.set(key, serialized)
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ""
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, query, signal } = options

  const response = await fetch(`${API_BASE_URL}${path}${buildQueryString(query)}`, {
    method,
    signal,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (response.status === 204) {
    if (!response.ok) throw await createApiError(response)
    return undefined as T
  }

  const payload = await readJson(response)
  if (response.ok) return payload as T

  throw await createApiError(response, payload)
}

async function createApiError(response: Response, payload?: unknown): Promise<ApiError> {
  const parsed = ProblemDetailSchema.safeParse(payload ?? (await readJson(response)))

  return new ApiError({
    status: response.status,
    problem: parsed.success
      ? parsed.data
      : {
          code: "unknown_error",
          title: "Request failed",
          message: `HTTP ${response.status}`,
        },
  })
}

async function readJson(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? ""
  if (!contentType.includes("json")) return null

  try {
    return await response.json()
  } catch {
    return null
  }
}
