import type { ApiModule } from "../core/api/ApiModule.type.js";
import type { Module } from "../core/business/Module.type.js";
import { ModuleLinkFactory } from "./ModuleLinkFactory.js";
import { ModuleNodeBuilder } from "./ModuleNodeBUilder.js";

export function ModuleFactory(module: ApiModule): Module {
  return {
    id: module.id,
    nodes: module.nodes.map(ModuleNodeBuilder),
    links: module.links.map(l => ModuleLinkFactory(l, module))
  }
}