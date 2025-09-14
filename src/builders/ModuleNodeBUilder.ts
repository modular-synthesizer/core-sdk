import type { ApiModuleNode } from "../core/api/ApiModule.type.js";
import type { ModuleNode } from "../core/business/ModuleNode.type.js";

export function ModuleNodeBuilder(data: ApiModuleNode): ModuleNode {
  return data.polyphonic ? { ...data, audioNodes: [], } : { ...data, polyphonic: false }
}