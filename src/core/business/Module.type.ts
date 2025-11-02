import { Control } from "./Control.type.js"
import type { ModuleLink } from "./ModuleLink.type.js"
import type { ModuleNode } from "./ModuleNode.type.js"
import type { Parameter } from "./Parameter.type.js"
import type { Port } from "./Port.type.js"

export type ModuleBox = {
  id: string
  rack: number
  slot: number
  slots: number
}

export type Module = ModuleBox & {
  id: string,
  // Inner nodes are indexed on their names
  nodes: Record<string, ModuleNode>,
  // Inner links are indexed on their UUID
  links: Record<string, ModuleLink>

  ports: Record<string, Port>

  parameters: Record<string, Parameter>

  controls: Control[]
}