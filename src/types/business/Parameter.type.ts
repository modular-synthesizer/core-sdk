import type { ModuleNode } from "./ModuleNode.type"

export type Parameter = {
  id: string
  value: number
  name: string
  precision: number
  minimum: number
  maximum: number
  step: number
  targets: Array<ModuleNode>
  field: string
  t: Date
}