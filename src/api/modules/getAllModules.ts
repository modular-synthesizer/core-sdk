import { ApiModule } from "../../types/api/ApiModule.type";
import { ExpectedResult, Fetcher } from "../../types/utils/Async";
import { createFetcher } from "../createFetcher";

export type getAllModulesApi = (id: string, auth_token: string) => ExpectedResult<ApiModule[]>

export function getAllModulesTemplate(fetcher: Fetcher<ApiModule[]>): getAllModulesApi {
  return async (synthesizer_id, auth_token) => {
    return await fetcher("GET", "/modules", { auth_token }, { synthesizer_id })
  }
}

export const getAllModules: getAllModulesApi = getAllModulesTemplate(
  createFetcher<ApiModule[]>(fetch)
)