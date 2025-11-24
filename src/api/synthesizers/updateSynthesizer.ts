import type { Synthesizer } from "../../types/business/Synthesizer.type";
import type { ExpectedResult, Fetcher } from "../../types/utils/Async";
import { createFetcher } from "../createFetcher";
import { createPayload } from "../utils/createPayload";

export type UpdateSynthesizerApi = (synthesizer: Synthesizer, auth_token: string) => ExpectedResult<Synthesizer>

export function updateSynthesizerTemplate(fetcher: Fetcher<void>): UpdateSynthesizerApi {
  return async (synthesizer, auth_token) => {
    const { id, x, y, scale } = synthesizer
    await fetcher("PUT", `/synthesizers/${id}`, { auth_token }, createPayload({ x, y, scale }))
    return { ok: true, data: synthesizer }
  }
}

export const updateSynthesizer: UpdateSynthesizerApi = updateSynthesizerTemplate(
  createFetcher<void>(fetch)
)