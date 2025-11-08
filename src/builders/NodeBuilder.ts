import type { ApiModuleNode } from "../types/api/ApiModule.type.js";
import type { ModuleNode } from "../types/business/ModuleNode.type.js";

export function NodeBuilder(data: ApiModuleNode): ModuleNode {
  return data.polyphonic ? { ...data, audioNodes: [], } : { ...data, polyphonic: false }
}