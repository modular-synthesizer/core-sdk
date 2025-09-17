import type { ApiModule } from "../core/api/ApiModule.type.js";
import type { Module } from "../core/business/Module.type.js";
import { indexOn } from "../utils/indexOn.js";
import { LinkBuilder } from "./LinkBuilder.js";
import { NodeBuilder } from "./NodeBuilder.js";
import { PortBuilder } from "./PortBuilder.js";

export function ModuleBuilder(module: ApiModule): Module {
  const nodes = module.nodes.map(NodeBuilder)
  const links = module.links.map(l => LinkBuilder(l, module))
  const result: Module = {
    id: module.id,
    nodes: indexOn(nodes, "name"),
    links: indexOn(links, "id"),
    ports: {}
  }
  const ports = module.ports.map(p => PortBuilder(p, result))
  result.ports = indexOn(ports, "name")
  return result
}