import { describe, it, expect } from "vitest"
import { SynthesizerBuilder } from "../../src/builders/SynthesizerBuilder"
import type { ApiSynthesizer } from "../../src/types/api/ApiSynthesizer.type"
import type { ApiModule } from "../../src/types/api/ApiModule.type"
import type { MonophonicNode, PolyphonicNode } from "../../src/types/business/ModuleNode.type"
import type { ApiCable } from "../../src/types/api/ApiCable.type"
import type { ParamLink } from "../../src/types/business/ModuleLink.type"
import type { Port, SmallKnob } from "../../src/types/business/Control.type"

describe("SynthesizerBuilder", () => {
  describe("Nominal case", async () => {
    const today = (new Date()).toISOString()
    const fetcher: () => ApiSynthesizer = () => {
      return { id: "synth-id", name: "synth name", voices: 16, x: 0, y: 0, scale: 1.0 }
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
      id: 'poly-id',
    }
    const modulesFetcher: () => ApiModule[] = () => {
      return [{
        id: "module-id",
        rack: 1,
        slot: 2,
        slots: 6,
        type: "VCO",
        nodes: [monophonicNode, polyphonicNode],
        links: [
          { from: { node: "test-mono", index: 0 }, to: { node: "test-poly", index: 1 }, id: "link-id" },
          { from: { node: "test-mono", index: 0 }, to: { node: "test-poly.gain", index: 0 }, id: "other-link-id" },
        ],
        ports: [
          { id: "port-id", name: "port", index: 0, kind: "output", target: "test-poly" },
          { id: "input-id", name: "input", index: 0, kind: "input", target: "test-poly" },
        ],
        parameters: [
          {
            id: 'param-id',
            name: 'gain',
            targets: ['test-mono'],
            value: 2.5,
            minimum: 2,
            maximum: 5,
            step: 0.1,
            precision: 1,
            field: 'gain',
            t: today
          }
        ],
        controls: [
          { id: "sk-id", component: "SmallKnob", payload: { x: 0, y: 0, target: "gain", label: "SK" } },
          { id: "p-id-1", component: "Port", payload: { x: 0, y: 0, target: "input", label: "IN" } },
          { id: "p-id-2", component: "Port", payload: { x: 0, y: 0, target: "port", label: "IN" } },
        ]
      }]
    }
    const cablesFetcher: () => ApiCable[] = () => {
      return [
        {
          id: 'cable-id',
          from: { port: 'port', module: 'module-id' },
          to: { port: 'input', module: 'module-id' },
          color: 'red',
        },
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
      it("Has created a module with the correct rack", () => {
        expect(module.rack).toEqual(1)
      })
      it("Has created a module with the correct width", () => {
        expect(module.slots).toEqual(6)
      })
      it("Has created a module with the correct slot", () => {
        expect(module.slot).toEqual(2)
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
        describe("To another node", () => {
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
          it("Links to no parameter", () => {
            expect(link.toParameter).toBeFalsy()
          })
        })
        describe("To a parameter", () => {
          const link = module.links["other-link-id"]

          it("Has the correct UUID", () => {
            expect(link.id).toEqual("other-link-id")
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
            expect(link.to.index).toEqual(0)
          })
          it("Remembers it is linked to an audio parameter", () => {
            expect(link.toParameter).toBeTruthy()
          })
          it("Remembers the audio parameter to link to", () => {
            expect((link as ParamLink).parameter).toEqual('gain')
          })
        })
      })
      describe("Parameters", () => {
        const parameter = module.parameters.gain

        it("Has the correct UUID", () => {
          expect(parameter.id).toEqual("param-id")
        })
        it("Has the correct value", () => {
          expect(parameter.value).toEqual(2.5)
        })
        it("Has the correct minimum value", () => {
          expect(parameter.minimum).toEqual(2)
        })
        it("Has the correct maximum value", () => {
          expect(parameter.maximum).toEqual(5)
        })
        it("Has the correct step value", () => {
          expect(parameter.step).toEqual(0.1)
        })
        it("Has the correct precision", () => {
          expect(parameter.precision).toEqual(1)
        })
        it("Points to the correct targets", () => {
          expect(parameter.targets[0].id).toEqual(monophonicNode.id)
        })
        it("Points to the correct field", () => {
          expect(parameter.field).toEqual("gain")
        })
        it("Has the correct timestamp", () => {
          expect(parameter.t.toISOString()).toEqual(today)
        })
      })
      describe("Controls", () => {
        it("Has three controls built", () => {
          expect(module.controls.length).toEqual(3)
        })
        describe("Small knob", () => {
          const smallKnob: SmallKnob = module.controls[0] as SmallKnob

          it("Has the correct UUID", () => {
            expect(smallKnob.id).toEqual("sk-id")
          })
          it("Points to the correct parameter", () => {
            expect(smallKnob.payload.target.id).toEqual("param-id")
          })
        })
        describe("Port", () => {
          const port: Port = module.controls[1] as Port

          it("Has the correct UUID", () => {
            expect(port.id).toEqual("p-id-1")
          })
          it("Points to the correct parameter", () => {
            expect(port.payload.target.id).toEqual("input-id")
          })
        })
      })
    })

    describe("Cables", () => {
      const cable = synthesizer.cables[0]

      it("Has the correct UUID", () => {
        expect(cable.id).toEqual("cable-id")
      })
      it("Points to the correct origin", () => {
        expect(cable.from.id).toEqual("p-id-2")
      })
      it("Points the the correct destination", () => {
        expect(cable.to.id).toEqual("p-id-1")
      })
    })

    describe("Ports", () => {
      const port = synthesizer.modules['module-id']?.ports.port

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