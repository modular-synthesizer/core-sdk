import type { ApiSynthesizer } from "../../../src/types/api/ApiSynthesizer.type";
import { createFactory } from "../../utils/factories";

export const ApiSynthezsizerFactory = createFactory<ApiSynthesizer>({
  id: () => "synthesizer-id",
  name: () => "Synthesizer name",
  x: () => 10,
  y: () => 20,
  scale: () => 2.0,
  voices: () => 1,
})