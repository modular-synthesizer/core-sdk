import type { ExpectedResult, HttpPayload, HttpVerb } from "../types/utils/Async"
import { UnauthenticatedException } from "./UnauthenticatedException";

async function getBody(response: Response) {
  try {
    return await response.json();
  } catch (_) {
    return undefined;
  }
}

type Fetch = typeof fetch;

export function createFetcher<Entity>(fetchFunction: Fetch) {
  return async (
    method: HttpVerb,
    url: string,
    parameters: HttpPayload = {},
    body: HttpPayload = {},
  ): ExpectedResult<Entity> => {
    let response;
    try {
      const params = new URLSearchParams(parameters);
      const hasBody = !["GET", "DELETE"].includes(method);
      const options = {
        method,
        ...(hasBody ? { body: JSON.stringify(body) } : {}),
      };
      response = await fetchFunction(
        `/proxy${url}?${params.toString()}`,
        options,
      );
    } catch (exception: unknown) {
      return {
        ok: false,
        message: (exception as Error).message,
        key: "unknown",
      };
    }
    if (response.status === 403) {
      console.log(url)
      throw new UnauthenticatedException({ key: 'session_id', message: 'unauthenticated' })
    }
    if (response.status > 299) {
      const body = await getBody(response);
      return { ok: false, message: body.message, key: body.key };
    }
    return { ok: true, data: await getBody(response) };
  };
}
