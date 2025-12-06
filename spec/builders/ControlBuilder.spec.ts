import { describe, expect, it } from "vitest"
import type { Module } from "../../src/types/business/Module.type"
import { ControlBuilder } from "../../src/builders/ControlBuilder"
import type { Control } from "../../src/types/business/Control.type"
import type { ApiModule } from "../../src/types/api/ApiModule.type"
import { ModuleBuilder } from "../../src/builders/ModuleBuilder"
import { Parameterfactory } from "../factories/ParameterFactory"
import { PortFactory } from "../factories/PortFactory"

describe("ControlBuilder", async () => {
  const module: ApiModule = {
    id: "module-id",
    rack: 0, slot: 0, slots: 2,
    nodes: [
      { id: "target-1", name: "target-one", generator: "createGain", polyphonic: false },
    ],
    links: [],
    ports: [
      await PortFactory({ target: "target-one" })
    ],
    parameters: [
      await Parameterfactory({ targets: ["target-one"], name: "param" }),
    ],
    type: "",
    controls: [
      { id: "small-knob-id", component: "SmallKnob", payload: { x: 10, y: 20, target: "param", label: "test" } },
      { id: 'knob-id', component: 'Knob', payload: { x: 11, y: 21, target: 'param', label: "test2" } },
      { id: "large-knob-id", component: "LargeKnob", payload: { x: 12, y: 22, target: "param", label: "test3" } },
      { id: "port-id", component: "Port", payload: { x: 13, y: 23, target: 'port-in', label: 'IN' } }
    ]
  }

  const instanciated: Module = ModuleBuilder(module)

  describe("SmallKnob", () => {
    const smallKnob: Control = ControlBuilder(module.controls[0], instanciated) as Control

    it("Has the correct ID", () => {
      expect(smallKnob.id).toEqual("small-knob-id")
    })
    it("has the correct comonent", () => {
      expect(smallKnob.component).toEqual("SmallKnob")
    })
    it("Has the correct X coordinate", () => {
      expect(smallKnob.payload.x).toBe(10)
    })
    it("Has the correct Y coordinate", () => {
      expect(smallKnob.payload.y).toBe(20)
    })
    it("Has the correct label", () => {
      expect(smallKnob.payload.label).toBe("test")
    })
    it("Targets the correct parameter", () => {
      expect(smallKnob.payload.target?.id).toEqual("parameter-id")
    })
    it("Is in the correct module", () => {
      expect(smallKnob.module.id).toEqual("module-id")
    })
  })

  describe("Knob", () => {
    const knob: Control = ControlBuilder(module.controls[1], instanciated) as Control

    it("Has the correct ID", () => {
      expect(knob.id).toEqual("knob-id")
    })
    it("has the correct comonent", () => {
      expect(knob.component).toEqual("Knob")
    })
    it("Has the correct X coordinate", () => {
      expect(knob.payload.x).toBe(11)
    })
    it("Has the correct Y coordinate", () => {
      expect(knob.payload.y).toBe(21)
    })
    it("Has the correct label", () => {
      expect(knob.payload.label).toBe("test2")
    })
    it("Targets the correct node", () => {
      expect(knob.payload.target?.id).toEqual("parameter-id")
    })
    it("Is in the correct module", () => {
      expect(knob.module.id).toEqual("module-id")
    })
  })

  describe("LargeKnob", () => {
    const largeKnob: Control = ControlBuilder(module.controls[2], instanciated) as Control

    it("Has the correct ID", () => {
      expect(largeKnob.id).toEqual("large-knob-id")
    })
    it("has the correct comonent", () => {
      expect(largeKnob.component).toEqual("LargeKnob")
    })
    it("Has the correct X coordinate", () => {
      expect(largeKnob.payload.x).toBe(12)
    })
    it("Has the correct Y coordinate", () => {
      expect(largeKnob.payload.y).toBe(22)
    })
    it("Has the correct label", () => {
      expect(largeKnob.payload.label).toBe("test3")
    })
    it("Targets the correct node", () => {
      expect(largeKnob.payload.target?.id).toEqual("parameter-id")
    })
    it("Is in the correct module", () => {
      expect(largeKnob.module.id).toEqual("module-id")
    })
  })

  describe("Port", () => {
    const port: Control = ControlBuilder(module.controls[3], instanciated) as Control

    it("Has the correct ID", () => {
      expect(port.id).toEqual("port-id")
    })
    it("has the correct comonent", () => {
      expect(port.component).toEqual("Port")
    })
    it("Has the correct X coordinate", () => {
      expect(port.payload.x).toBe(13)
    })
    it("Has the correct Y coordinate", () => {
      expect(port.payload.y).toBe(23)
    })
    it("Has the correct label", () => {
      expect(port.payload.label).toBe("IN")
    })
    it("Targets the correct node", () => {
      expect(port.payload.target?.id).toEqual("port-id")
    })
    it("Is in the correct module", () => {
      expect(port.module.id).toEqual("module-id")
    })
  })
})