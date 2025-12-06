import type { ApiCable } from "../types/api/ApiCable.type.js";
import type { Cable } from "../types/business/Cable.type.js";
import type { Module } from "../types/business/Module.type.js";
import type { Port as PortControl } from "../types/business/Control.type.js"

export function CableBuilder(data: ApiCable, modules: Record<string, Module>): Cable {
  const controlFrom: PortControl = modules[data.from.module].controls.find(
    c => c.payload.target.name === data.from.port
  ) as PortControl
  const controlTo: PortControl = modules[data.to.module].controls.find(
    c => c.payload.target.name === data.to.port
  ) as PortControl
  const cable: Cable = {
    id: data.id,
    from: controlFrom, 
    to: controlTo,
  }
  if (controlFrom) controlFrom.cable = cable
  if (controlTo) controlTo.cable = cable
  return cable
}