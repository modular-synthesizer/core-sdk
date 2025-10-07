import type { ApiParameter } from "./ApiParameter.type"

export type ApiPort = {
  id: string
  name: string
  index: number
  kind: 'input' | 'output'
  target: string
}

export type ApiModule = {
  id: string
  rack: number
  slot: number
  slots: number
  type: string
  nodes: ApiModuleNode[]
  links: ApiModuleLink[]
  ports: ApiPort[]
  parameters: ApiParameter[]
}

export type ApiModuleNode = { id: string, name: string, generator: string, polyphonic: boolean }

export type ApiModuleLink = {
  id: string
  from: { node: string, index: number }
  to: { node: string, index: number }
}