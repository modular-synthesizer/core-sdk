import type { NodeGenerator } from "../../src/types/business/NodeGenerator.type";
import { createFactory } from "../utils/factories";

export const NodeGeneratorFactory = createFactory<NodeGenerator>({
  id: () => "generator-id",
  name: () => "generator_name",
  code: () => "return null;"
})