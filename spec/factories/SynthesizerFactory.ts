import type { Synthesizer } from "../../src/types/business/Synthesizer.type";
import { createFactory } from "../utils/factories";

export const SynthesizerFactory = createFactory<Synthesizer>({
  id: () =>  "synthesizer-id",
  name: () => "synthesizer name",
  x: () => 0,
  y: () => 0,
  scale: () => 1.0,
  voices: () => 8,
  modules: () => ({}),
  cables: () => []
})