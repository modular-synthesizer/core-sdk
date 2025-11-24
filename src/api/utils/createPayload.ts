import type { HttpPayload } from "../../types/utils/Async";

export function createPayload(data: Record<string, string|number>): HttpPayload {
  return Object.fromEntries(Object.entries(data).map(e => [e[0], `${e[1]}`]))
}