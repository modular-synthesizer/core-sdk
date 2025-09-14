import type { ModuleNode } from "./ModuleNode.type.js"

type LinkEnd = { node: ModuleNode, index: number }

export type ModuleLink = {
  from: LinkEnd,
  to: LinkEnd,
  id: string
}