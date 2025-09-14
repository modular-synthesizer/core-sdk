import type { ApiModule, ApiModuleLink } from "../core/api/ApiModule.type.js";
import type { ModuleLink } from "../core/business/ModuleLink.type.js";
import type { ModuleNode } from "../core/business/ModuleNode.type.js";

function findNode({ nodes }: ApiModule, name: string): ModuleNode {
  return nodes.find(n => n.name === name) as ModuleNode
}

export function ModuleLinkFactory(link: ApiModuleLink, module: ApiModule): ModuleLink {
  return {
    id: link.id,
    from: { node: findNode(module, link.from.node), index: link.from.index },
    to: { node: findNode(module, link.to.node), index: link.to.index }
  }
}