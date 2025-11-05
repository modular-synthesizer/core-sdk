import { describe, expect, it } from "vitest"
import type { Module } from "../../src/core/business/Module.type"
import { ControlBuilder } from "../../src/builders/ControlBuilder"
import type { Control } from "../../src/core/business/Control.type"
import type { ApiModule } from "../../src/core/api/ApiModule.type"
import { ModuleBuilder } from "../../src/builders/ModuleBuilder"

describe("ControlBuilder", () => {
  const module: ApiModule = {
    id: "module-id",
    rack: 0, slot: 0, slots: 2,
    nodes: [
      { id: "target-1", name: "target-one", generator: "createGain", polyphonic: false },
      { id: "target-2", name: "target-two", generator: "createGain", polyphonic: false },
      { id: "target-3", name: "target-three", generator: "createGain", polyphonic: false },
    ],
    links: [],
    ports: [],
    parameters: [],
    type: "",
    controls: [
      { id: "small-knob-id", component: "SmallKnob", payload: { x: 10, y: 20, target: "target-one", label: "test" } },
      { id: 'knob-id', component: 'Knob', payload: { x: 11, y: 21, target: 'target-two', label: "test2" } },
      { id: "large-knob-id", component: "LargeKnob", payload: { x: 12, y: 22, target: "target-three", label: "test3" } },
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
    it("Targets the correct node", () => {
      expect(smallKnob.payload.target?.id).toEqual("target-1")
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
      expect(knob.payload.target?.id).toEqual("target-2")
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
      expect(largeKnob.payload.target?.id).toEqual("target-3")
    })
  })
})