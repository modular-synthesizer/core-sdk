import type { ApiParameter } from "../../src/core/api/ApiParameter.type";
import { createFactory } from "../utils/factories";

export const Parameterfactory = createFactory<ApiParameter>({
  id: () =>  "parameter-id",
  value: () => 5,
  minimum: () => 0,
  maximum: () => 100,
  step: () => 1,
  precision: () => 1,
  name: () => "parameter-name",
  field: () => "gain",
  targets: () => [],
  t: () => (new Date()).toISOString(),
})