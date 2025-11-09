import type { ApiSynthesizer } from "../../types/api/ApiSynthesizer.type";
import type { ExpectedResult, Fetcher } from "../../types/utils/Async";
import { createFetcher } from "../createFetcher";

export type GetSynthesizerApi = (id: string, auth_token: string) => ExpectedResult<ApiSynthesizer>

export function getSynthesizerTemplate(fetcher: Fetcher<ApiSynthesizer>): GetSynthesizerApi {
  return async (id, auth_token) => {
    return await fetcher("GET", `/synthesizers/${id}`, { auth_token })
  }
}

export const getSynthesizer: GetSynthesizerApi = getSynthesizerTemplate(
  createFetcher<ApiSynthesizer>(fetch)
)