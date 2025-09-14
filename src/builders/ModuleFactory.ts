import type { ApiModule } from "../core/api/ApiModule.type.js";
import type { Module } from "../core/business/Module.type.js";

export function ModuleFactory(module: ApiModule): Module {
  return {
    id: module.id,
    nodes: [],
    links: []
  }
}