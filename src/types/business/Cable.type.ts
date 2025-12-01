import type { Port } from "./Control.type.js"

/**
 * A cable is a link between two modules, connected by specified ports. It is not a link between
 * two internal nodes, but rather a graphically represented item on a synthesizer board.
 */
export type Cable = {
  id: string
  // The UUID of the port you're trying to reach.
  from: Port
  to: Port
}