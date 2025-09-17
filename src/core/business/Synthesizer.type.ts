import type { Cable } from "./Cable.type.js"
import type { Module } from "./Module.type.js"
import type { Port } from "./Port.type.js"

export type Synthesizer = {
  id: string
  name: string
  voices: number
  // Modules are indexed on their UUID to make it easier to find
  modules: Record<string, Module>
  cables: Cable[]
}