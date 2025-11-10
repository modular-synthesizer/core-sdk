import { NodeGenerator } from "../../types/business/NodeGenerator.type";
import type { ExpectedResult, Fetcher } from "../../types/utils/Async";
import { createFetcher } from "../createFetcher";

export type getAllGeneratorsApi = (auth_token: string) => ExpectedResult<NodeGenerator[]>

export function getAllGeneratorsTemplate(fetcher: Fetcher<NodeGenerator[]>): getAllGeneratorsApi {
  return async auth_token => {
    return await fetcher("GET", "/generators", { auth_token })
  }
}

export const getAllGenerators: getAllGeneratorsApi = getAllGeneratorsTemplate(
  createFetcher<NodeGenerator[]>(fetch)
)