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
      { id: "target-1", name: "target-one", generator: "createGain", polyphonic: false }
    ],
    links: [],
    ports: [],
    parameters: [],
    type: "",
    controls: [
      { id: "small-knob-id", component: "SmallKnob", payload: { x: 10, y: 20, target: "target-one", label: "test" }}
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
})