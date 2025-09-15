import type { ApiModule } from "../core/api/ApiModule.type.js";
import type { Module } from "../core/business/Module.type.js";
import { indexOn } from "../utils/indexOn.js";
import { ModuleLinkFactory } from "./ModuleLinkFactory.js";
import { ModuleNodeBuilder } from "./ModuleNodeBUilder.js";

export function ModuleFactory(module: ApiModule): Module {
  const nodes = module.nodes.map(ModuleNodeBuilder)
  const links = module.links.map(l => ModuleLinkFactory(l, module))
  return {
    id: module.id,
    nodes: indexOn(nodes, "name"),
    links: indexOn(links, "id")
  }
}