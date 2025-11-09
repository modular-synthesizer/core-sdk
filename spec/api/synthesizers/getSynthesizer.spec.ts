import { describe, expect, test, vi } from "vitest";
import { getSynthesizerTemplate } from "../../../src/api/synthesizers/getSynthesizer";
import type { ApiSynthesizer } from "../../../src/types/api/ApiSynthesizer.type";
import { createFetcher } from "../../../src/api/createFetcher";
import { ApiSynthezsizerFactory } from "../../factories/api/ApiSynthesizer.factory";

const mocks = {
  fetch: vi.fn().mockReturnValue({
    status: 200,
    json: async () => (await ApiSynthezsizerFactory())
  })
}

describe("When a user is trying to get a synthesizer", () => {
  test("it correctly calls the API", async () => {
    const spy = vi.spyOn(mocks, "fetch")
    const fetcher = createFetcher<ApiSynthesizer>(mocks.fetch)
    const getSynthesizer = getSynthesizerTemplate(fetcher)
    await getSynthesizer("synthesizer_id", "auth_token")

    // Here we check that fetch has been called with the correct arguments and we trust node to implement further layers correctly.
    expect(spy).toHaveBeenCalledExactlyOnceWith("/proxy/synthesizers/synthesizer_id?auth_token=auth_token", { method: "GET" })
  })
})