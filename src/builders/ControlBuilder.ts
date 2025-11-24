import type { ApiControl } from "../types/api/ApiControl.type";
import type { Control } from "../types/business/Control.type";
import type { Module } from "../types/business/Module.type";

export function ControlBuilder(data: ApiControl, module: Module): Control | undefined {
  const c = data.component
  if (c === "SmallKnob" || c === "Knob" || c === "LargeKnob") {
    const target: string = `${data.payload.target}`
    return { component: c, id: data.id, payload: { ...data.payload, target: module.parameters[target] } }
  }
  if (c === 'Port') {
    const target: string = `${data.payload.target}`
    return { component: c, id: data.id, payload: { ...data.payload, target: module.ports[target] } }
  }
}