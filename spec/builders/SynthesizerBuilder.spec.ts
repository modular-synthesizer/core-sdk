import { describe, it, expect } from "vitest"
import { SynthesizerBuilder } from "../../src/builders/SynthesizerBuilder"
import { ApiSynthesizer } from "../../src/core/api/ApiSynthesizer.type"

describe("SynthesizerBuilder", () => {
  describe("Nominal case", async () => {
    const fetcher: () => Promise<ApiSynthesizer> = async () => {
      return { id: "synth-id", name: "synth name", voices: 16 }
    }
    const synthesizer = await SynthesizerBuilder(fetcher())

    it("Has the correct UUID from the data", () => {
      expect(synthesizer.id).toEqual("synth-id")
    })
    it("Has the correct name for the data", () => {
      expect(synthesizer.name).toEqual("synth name")
    })
    it("Has the correct number of polyphony voices", () => {
      expect(synthesizer.voices).toEqual(16)
    })
  })
})