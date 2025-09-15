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
  /**
   * Ports are indexed on their UUIDs so that they can easily be accessed to (dis)connect a cable
   * TODO :
   * * Move the ports to the module, indexed on the name
   * * Make the cables be linked to a module's UUID and a port's name instead
   */
  ports: Record<string, Port>
}