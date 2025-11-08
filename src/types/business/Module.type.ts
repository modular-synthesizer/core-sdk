import type { Control } from "./Control.type.js"
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
  // The unique identifier of the module.
  id: string,
  // Inner nodes are indexed on their names.
  nodes: Record<string, ModuleNode>,
  // Inner links are indexed on their UUID.
  links: Record<string, ModuleLink>
  // The different ports where cables can be plugged in.
  ports: Record<string, Port>
  // The different parameters setting AudioParam values.
  parameters: Record<string, Parameter>
  // The different controls setting parameters values.
  controls: Control[]
}