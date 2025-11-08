import type { Module } from "../types/business/Module.type"
import type { ApiModuleLink } from "../types/api/ApiModule.type.js";
import type { BaseLink, ModuleLink } from "../types/business/ModuleLink.type.js";
import type { ModuleNode } from "../types/business/ModuleNode.type.js";

const PARAM_REGEX = /^[^.]+\.{1}[^.]+$/

function findNode({ nodes }: Module, name: string): ModuleNode {
  const parsedName = name.match(PARAM_REGEX) ? name.split(".")[0] : name
  return nodes[parsedName]
}

export function LinkBuilder(link: ApiModuleLink, module: Module): ModuleLink {
  const result: BaseLink = {
    id: link.id,
    from: { node: findNode(module, link.from.node), index: link.from.index },
    to: { node: findNode(module, link.to.node), index: link.to.index }
  }
  if (link.to.node.match(PARAM_REGEX)) {
    return {
      ...result, toParameter: true, parameter: link.to.node.split(".")[1]
    }
  }
  return { ...result, toParameter: false }
}