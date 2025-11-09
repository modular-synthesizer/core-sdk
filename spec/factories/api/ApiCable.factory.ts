import type { ApiCable } from "../../../src/types/api/ApiCable.type";
import { createFactory } from "../../utils/factories";

export const ApiCableFactory = createFactory<ApiCable>({
  id: () => "link-id",
  from: () => ({
    module: "module-id",
    port: "IN"
  }),
  to: () => ({
    module: "module-id",
    port: "OUT"
  }),
  color: () => "red"
})