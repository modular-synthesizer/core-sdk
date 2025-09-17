import type { ApiCable } from "../core/api/ApiCable.type.js";
import type { Cable } from "../core/business/Cable.type.js";
import type { Module } from "../core/business/Module.type.js";
import type { Port } from "../core/business/Port.type.js";

export function CableBuilder(data: ApiCable, modules: Record<string, Module>): Cable {
  return {
    id: data.id,
    from: modules[data.from.module]?.ports[data.from.port] as Port,
    to: modules[data.to.module]?.ports[data.to.port] as Port,
  }
}