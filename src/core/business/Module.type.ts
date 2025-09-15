import type { ModuleLink } from "./ModuleLink.type.js"
import type { ModuleNode } from "./ModuleNode.type.js"

export type Module = {
  id: string,
  // Inner nodes are indexed on their names
  nodes: Record<string, ModuleNode>,
  // Inner links are indexed on their UUID
  links: Record<string, ModuleLink>
}