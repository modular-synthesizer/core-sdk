import { vi } from "vitest";

export function createApiReturning<T>(data: T) {
  return vi.fn().mockReturnValue({ ok: true, data })
}