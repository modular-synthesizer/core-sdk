import type { ApiCable } from "../../types/api/ApiCable.type";
import type { ExpectedResult, Fetcher } from "../../types/utils/Async";
import { createFetcher } from "../createFetcher";

export type getAllCablesApi = (id: string, auth_token: string) => ExpectedResult<ApiCable[]>

/**
 * API to get all the cables for a synthesizer. This uses the v2 endpoint to get cables with both ends
 * having both a module UUID and a port name, allowing for easier retrieval and linkage in the synth.
 * 
 * @param {string} synthesizer_id the UUID of the synthesizer to get the list of cables for
 * @param {string} auth_token the login token for the current user, used to authenticate on the API.
 * 
 * @returns {ExpectedResult<ApiCable[]>} either a result with `ok` set to true and `data` to a list of cables,
 *   or `ok` set to false, and the usual #key and #message fields accessible to describe the error.
 * 
 * @throws {UnauthenticatedException} an exception if the current authentication token is expired.
 */
export const getAllCables: getAllCablesApi = getAllCablesTemplate(
  createFetcher<ApiCable[]>(fetch)
)

export function getAllCablesTemplate(fetcher: Fetcher<ApiCable[]>): getAllCablesApi {
  return async (synthesizer_id, auth_token) => {
    return await fetcher("GET", "/links/v2", { auth_token, synthesizer_id })
  }
}