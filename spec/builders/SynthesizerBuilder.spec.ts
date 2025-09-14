import { describe, it, expect } from "vitest"
import { SynthesizerBuilder } from "../../src/builders/SynthesizerBuilder"
import { ApiSynthesizer } from "../../src/core/api/ApiSynthesizer.type"
import { ApiModule } from "../../src/core/api/ApiModule.type"

describe("SynthesizerBuilder", () => {
  describe("Nominal case", async () => {
    const fetcher: () => Promise<ApiSynthesizer> = async () => {
      return { id: "synth-id", name: "synth name", voices: 16 }
    }
    const modulesFetcher: () => Promise<ApiModule[]> = async () => {
      return [{ id: "module-id", rack: 0, slot: 0, slots: 2, type: "VCO" }]
    }
    const synthesizer = await SynthesizerBuilder(fetcher(), modulesFetcher())

    it("Has the correct UUID from the data", () => {
      expect(synthesizer.id).toEqual("synth-id")
    })
    it("Has the correct name for the data", () => {
      expect(synthesizer.name).toEqual("synth name")
    })
    it("Has the correct number of polyphony voices", () => {
      expect(synthesizer.voices).toEqual(16)
    })

    describe("Modules", () => {
      const module = synthesizer.modules[0]

      it("Has created a module with the correct ID", () => {
        expect(module.id).toEqual("module-id")
      })
    })
  })
})