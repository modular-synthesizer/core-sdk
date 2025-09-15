import type { ApiCable } from "../core/api/ApiCable.type.js";
import type { Cable } from "../core/business/Cable.type.js";
import type { Port } from "../core/business/Port.type.js";

export function CableBuilder(data: ApiCable, ports: Record<string, Port>): Cable {
  return {
    id: data.id,
    from: ports[data.from] as Port,
    to: ports[data.to] as Port
  }
}