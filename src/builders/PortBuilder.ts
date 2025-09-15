import type { ApiPort } from "../core/api/ApiModule.type.js";
import type { Module } from "../core/business/Module.type.js";
import type { ModuleNode } from "../core/business/ModuleNode.type.js";
import type { Port } from "../core/business/Port.type.js";

export function PortBuilder(p: ApiPort, m: Module): Port {
  return {
    id: p.id,
    name: p.name,
    index: p.index,
    kind: p.kind,
    target: m.nodes[p.target] as ModuleNode
  }
}