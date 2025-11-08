import { ScaledCoordinates } from "../utils/ScaledCoordinates.js"
import type { Cable } from "./Cable.type.js"
import type { Module } from "./Module.type.js"

export type Synthesizer = ScaledCoordinates & {
  id: string
  name: string
  voices: number
  // Modules are indexed on their UUID to make it easier to find
  modules: Record<string, Module>
  cables: Cable[]
}