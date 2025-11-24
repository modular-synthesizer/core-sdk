import type{ ApiPort } from "../../src/types/api/ApiModule.type";
import { createFactory } from "../utils/factories";

export const PortFactory = createFactory<ApiPort>({
  id: () => "port-id",
  name: () => "port-in",
  index: () => 0,
  kind: () => "input",
  target: () => "gain"
})