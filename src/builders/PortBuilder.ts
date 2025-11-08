import type { ApiPort } from "../types/api/ApiModule.type.js";
import type { Module } from "../types/business/Module.type.js";
import type { ModuleNode } from "../types/business/ModuleNode.type.js";
import type { Port } from "../types/business/Port.type.js";

export function PortBuilder(p: ApiPort, m: Module): Port {
  return {
    id: p.id,
    name: p.name,
    index: p.index,
    kind: p.kind,
    target: m.nodes[p.target] as ModuleNode
  }
}