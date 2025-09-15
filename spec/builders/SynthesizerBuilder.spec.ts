import { describe, it, expect } from "vitest"
import { SynthesizerBuilder } from "../../src/builders/SynthesizerBuilder"
import { ApiSynthesizer } from "../../src/core/api/ApiSynthesizer.type"
import { ApiModule } from "../../src/core/api/ApiModule.type"
import { MonophonicNode, PolyphonicNode } from "../../src/core/business/ModuleNode.type"
import { ApiCable } from "../../src/core/api/ApiCable.type"

describe("SynthesizerBuilder", () => {
  describe("Nominal case", async () => {
    const fetcher: () => Promise<ApiSynthesizer> = async () => {
      return { id: "synth-id", name: "synth name", voices: 16 }
    }
    const monophonicNode: MonophonicNode = {
      polyphonic: false,
      name: 'test-mono',
      generator: 'createGain',
      id: 'mono-id'
    }
    const polyphonicNode: PolyphonicNode = {
      audioNodes: [],
      polyphonic: true,
      name: 'test-poly',
      generator: 'createGain',
      id: 'poly-id'
    }
    const modulesFetcher: () => Promise<ApiModule[]> = async () => {
      return [{
        id: "module-id",
        rack: 0,
        slot: 0,
        slots: 2,
        type: "VCO",
        nodes: [monophonicNode, polyphonicNode],
        links: [
          { from: { node: "test-mono", index: 0 }, to: { node: "test-poly", index: 1 }, id: "link-id" }
        ],
        ports: [
          { id: "port-id", name: "port", index: 0, kind: "output", target: "test-poly" },
          { id: "input-id", name: "port", index: 0, kind: "input", target: "test-poly" }
        ]
      }]
    }
    const cablesFetcher: () => Promise<ApiCable[]> = async () => {
      return [
        { id: 'cable-id', from: 'port-id', to: 'input-id', color: 'red' }
      ]
    }
    const synthesizer = await SynthesizerBuilder(fetcher(), modulesFetcher(), cablesFetcher())

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
      const module = synthesizer.modules["module-id"]

      it("Has created a module with the correct ID", () => {
        expect(module.id).toEqual("module-id")
      })

      describe("Nodes", () => {
        describe("Mono", () => {
          const node = module.nodes["test-mono"]

          it("Has the correct UUID", () => {
            expect(node.id).toEqual("mono-id")
          })
          it("Is monophonic", () => {
            expect(node.polyphonic).toBeFalsy()
          })
          it("Has the correct name", () => {
            expect(node.name).toEqual("test-mono")
          })
          it("Points to the right generator", () => {
            expect(node.generator).toEqual("createGain")
          })
        })
        describe("Poly", () => {
          const node = module.nodes["test-poly"]

          it("Has the correct UUID", () => {
            expect(node.id).toEqual("poly-id")
          })
          it("Is monophonic", () => {
            expect(node.polyphonic).toBeTruthy()
          })
          it("Has the correct name", () => {
            expect(node.name).toEqual("test-poly")
          })
          it("Points to the right generator", () => {
            expect(node.generator).toEqual("createGain")
          })
        })
      })
      describe("Links", () => {
        const link = module.links["link-id"]

        it("Has the correct UUID", () => {
          expect(link.id).toEqual("link-id")
        })
        it("Has the correct start node", () => {
          expect(link.from.node.name).toEqual("test-mono")
        })
        it("Has the correct start index", () => {
          expect(link.from.index).toEqual(0)
        })
        it("Has the correct end node", () => {
          expect(link.to.node.name).toEqual("test-poly")
        })
        it("Has the correct end index", () => {
          expect(link.to.index).toEqual(1)
        })
      })
    })

    describe("Cables", () => {
      const cable = synthesizer.cables[0]

      it("Has the correct UUID", () => {
        expect(cable.id).toEqual("cable-id")
      })
      it("Points to the correct origin", () => {
        expect(cable.from.id).toEqual("port-id")
      })
      it("Points the the correct destination", () => {
        expect(cable.to.id).toEqual("input-id")
      })
    })

    describe("Ports", () => {
      const port = synthesizer.ports["port-id"]

      it("Has the correct UUID", () => {
        expect(port.id).toEqual("port-id")
      })
      it("Has the correct name", () => {
        expect(port.name).toEqual("port")
      })
      it("Has the correct kind", () => {
        expect(port.kind).toEqual('output')
      })
      it("Has the correct index", () => {
        expect(port.index).toEqual(0)
      })
      it("Has the correct target", () => {
        expect(port.target.name).toEqual("test-poly")
      })
    })
  })
})