import { describe, test, vi } from "vitest";
import { SynthesizerFactory } from "../../factories/SynthesizerFactory";

describe("Given I'm a logged in user", () => {
  describe("When I try to save a synthesizer", async () => {

    const synthesizer = await SynthesizerFactory()
    const mocks = { api: vi.fn() }
    const spy = vi.spyOn(mocks, "api")

    test("Then it calls the API correctly", () => {

    })
    test("Then the timestamp is changed on the corresponding synthesizer", () => {
      
    })
  })
})