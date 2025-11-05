import type { ApiControl } from "../core/api/ApiControl.type";
import type { Control } from "../core/business/Control.type";
import type { Module } from "../core/business/Module.type";

export function ControlBuilder(data: ApiControl, module: Module): Control|undefined {
  const component = data.component
  if (["SmallKnob", "Knob", "LargeKnob"].includes(component)) {
    const target: string = `${data.payload.target}`
    return { component, id: data.id, payload: { ...data.payload, target: module.parameters[target] } }
  }
}