import { ApiCable } from "../../types/api/ApiCable.type";
import { ExpectedResult, Fetcher } from "../../types/utils/Async";
import { createFetcher } from "../createFetcher";

export type getAllCablesApi = (id: string, auth_token: string) => ExpectedResult<ApiCable[]>

export function getAllCablesTemplate(fetcher: Fetcher<ApiCable[]>): getAllCablesApi {
  return async (synthesizer_id, auth_token) => {
    return await fetcher("GET", "/cables", { auth_token }, { synthesizer_id })
  }
}

export const getAllCables: getAllCablesApi = getAllCablesTemplate(
  createFetcher<ApiCable[]>(fetch)
)