import { ApiModule } from "../../../src/types/api/ApiModule.type"
import { createFactory } from "../../utils/factories"

export const ApiModuleFactory = createFactory<ApiModule>({
  id: () => "module-id",
  rack: () => 0,
  slot: () => 0,
  slots: () => 2,
  type: () => "VCA",
  nodes: () => [],
  links: () => [],
  ports: () => [
    { id: "port-1", index: 0, kind: "input", target: "gain", name: "IN" },
    { id: "port-2", index: 0, kind: "output", target: "gain", name: "OUT" }
  ],
  parameters: () => [],
  controls: () => []
})