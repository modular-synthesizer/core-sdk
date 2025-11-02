import type { ApiModule } from "../core/api/ApiModule.type.js";
import type { Module } from "../core/business/Module.type.js";
import { indexOn } from "../utils/indexOn.js";
import { ControlBuilder } from "./ControlBuilder.js";
import { LinkBuilder } from "./LinkBuilder.js";
import { NodeBuilder } from "./NodeBuilder.js";
import { ParameterBuilder } from "./ParameterBuilder.js";
import { PortBuilder } from "./PortBuilder.js";

export function ModuleBuilder(module: ApiModule): Module {
  const nodes = module.nodes.map(NodeBuilder)
  const result: Module = {
    id: module.id,
    slot: module.slot,
    slots: module.slots,
    rack: module.rack,
    nodes: indexOn(nodes, "name"),
    links: {},
    ports: {},
    parameters: {},
    controls: module.controls.map(ControlBuilder)
  }

  const links = module.links.map(l => LinkBuilder(l, result))
  result.links = indexOn(links, "id")

  const ports = module.ports.map(p => PortBuilder(p, result))
  result.ports = indexOn(ports, "name")

  const parameters = module.parameters.map(p => ParameterBuilder(p, result))
  result.parameters = indexOn(parameters, "name")

  return result
}