import type { ModuleNode } from "./ModuleNode.type.js"

type LinkEnd = { node: ModuleNode, index: number }

export type BaseLink = {
  from: LinkEnd,
  to: LinkEnd,
  id: string,
}

export type ParamLink = BaseLink & {
  toParameter: true,
  parameter: string,
}

export type NodeLink = BaseLink & {
  toParameter: false,
}

export type ModuleLink = ParamLink | NodeLink