import { describe, expect, test, vi } from "vitest";
import { Synthesizer } from "../../../src/types/business/Synthesizer.type"
import { SynthesizerFetcherTemplate } from "../../../src/features/synthesizers/fetchSynthesizer"

const inErrorApi = vi.fn().mockReturnValue({ ok: false, key: 'unknown', error: 'unknown' })

const synthesizersApi = vi.fn().mockReturnValue({
  ok: true,
  data: {
    id: "synthesizer-id",
    name: "Synthesizer name",
    x: 10, y: 20, scale: 2.0, voices: 1,
  }
})

const modulesApi = vi.fn().mockReturnValue({
  ok: true, data: [
    {
      id: "module-id", rack: 0, slot: 0, slots: 2, type: "VCA", nodes: [], links: [], ports: [
        { id: "port-1", index: 0, kind: "input", target: "gain", name: "IN" },
        { id: "port-2", index: 0, kind: "output", target: "gain", name: "OUT" }
      ], parameters: [], controls: []
    }
  ]
})

const cablesApi = vi.fn().mockReturnValue({
  ok: true,
  data: [
    { id: "link-id", from: { module: "module-id", port: "IN" }, to: { module: "module-id", port: "OUT" }, color: "red" }
  ]
})

describe("Given that all APIs are responding correctly", async () => {
  const fetcher = SynthesizerFetcherTemplate(synthesizersApi, modulesApi, cablesApi)
  const synthesizer: Synthesizer = await fetcher("synthesizer-id") as Synthesizer

  describe("I get a correct synthesizer as an output", () => {

    test("Has the correct UUID", () => {
      expect(synthesizer.id).toEqual("synthesizer-id")
    })
    test("Has the correct name", () => {
      expect(synthesizer.name).toEqual("Synthesizer name")
    })
    test("Has the correct number of polyphony voices", () => {
      expect(synthesizer.voices).toEqual(1)
    })
    test("Has the correct X coordinate", () => {
      expect(synthesizer.x).toEqual(10)
    })
    test("Has the correct Y coordinate", () => {
      expect(synthesizer.y).toEqual(20)
    })
    test("Has the correct scale", () => {
      expect(synthesizer.scale).toEqual(2.0)
    })
    test("Has only one module", () => {
      expect(Object.values(synthesizer.modules).length).toEqual(1)
    })
    test("Has the correct module", () => {
      expect(synthesizer.modules["module-id"].id).toEqual("module-id")
    })
  })
})

describe("Given the synthesizer API returns an error", async () => {
  const fetcher = SynthesizerFetcherTemplate(inErrorApi, modulesApi, cablesApi)
  const synthesizer: Synthesizer | undefined = await fetcher("synthesizer-id")

  test("Did not return a synthesizer at all", () => {
    expect(synthesizer).toBeUndefined()
  })
})

describe("Given the modules API returns an error", async () => {
  const fetcher = SynthesizerFetcherTemplate(synthesizersApi, inErrorApi, cablesApi)
  const synthesizer: Synthesizer = await fetcher("synthesizer-id") as Synthesizer

  test("Returns a synthesizer with no modules", () => {
    expect(Object.values(synthesizer.modules).length).toEqual(0)
  })

  test("Returns a synthesizer with no cables as there are no modules to plug it into", () => {
    expect(synthesizer.cables.length).toEqual(0)
  })
})

describe("Given the modules API returns an error", async () => {
  const fetcher = SynthesizerFetcherTemplate(synthesizersApi, modulesApi, inErrorApi)
  const synthesizer: Synthesizer = await fetcher("synthesizer-id") as Synthesizer

  console.log(synthesizer)

  test("Returns a synthesizer with the correct number of modules", () => {
    expect(Object.values(synthesizer.modules).length).toEqual(1)
  })
  test("Returns a synthesizer with no cables", () => {
    expect(synthesizer.cables.length).toEqual(0)
  })
})