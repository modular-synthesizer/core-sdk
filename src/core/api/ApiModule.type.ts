export type ApiModule = {
  id: string
  rack: number
  slot: number
  slots: number
  type: string
  nodes: ApiModuleNode[]
  links: ApiModuleLink[]
}

export type ApiModuleNode = { id: string, name: string, generator: string, polyphonic: boolean }

export type ApiModuleLink = {
  id: string
  from: { node: string, index: number }
  to: { node: string, index: number }
}