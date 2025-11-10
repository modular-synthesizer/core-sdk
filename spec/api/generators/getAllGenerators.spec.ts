import { describe, expect, test, vi } from "vitest";
import { getAllGeneratorsTemplate } from "../../../src/api/generators/getAllGenerators";
import { createFetcher } from "../../../src/api/createFetcher";
import { NodeGeneratorFactory } from "../../factories/NodeGenerator.factory";
import { NodeGenerator } from "../../../src/types/business/NodeGenerator.type";

const mocks = {
  fetch: vi.fn().mockReturnValue({
    status: 200,
    json: async () => [await NodeGeneratorFactory()]
  })
}

describe("When a user is trying to get a list of generators", () => {
  test("it correctly calls the API", async () => {
    const spy = vi.spyOn(mocks, "fetch")
    const fetcher = createFetcher<NodeGenerator[]>(mocks.fetch)
    const getGenerators = getAllGeneratorsTemplate(fetcher)
    await getGenerators("auth_token")

    // Here we check that fetch has been called with the correct arguments and we trust node to implement further layers correctly.
    expect(spy).toHaveBeenCalledExactlyOnceWith("/proxy/generators?auth_token=auth_token", { method: "GET" })
  })
})