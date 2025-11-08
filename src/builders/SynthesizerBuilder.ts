import type { ApiCable } from "../types/api/ApiCable.type.js";
import type { ApiModule } from "../types/api/ApiModule.type.js";
import type { ApiSynthesizer } from "../types/api/ApiSynthesizer.type.js";
import type { Synthesizer } from "../types/business/Synthesizer.type.js";
import { indexOn } from "../utils/indexOn.js";
import { CableBuilder } from "./CableBuilder.js";
import { ModuleBuilder } from "./ModuleBuilder.js";

export async function SynthesizerBuilder(
  data: ApiSynthesizer,
  apiModules: ApiModule[],
  apiCables: ApiCable[]
): Promise<Synthesizer> {
  const modules = apiModules.map(ModuleBuilder)

  const results: Synthesizer = {
    voices: data.voices,
    name: data.name,
    id: data.id,
    modules: indexOn(modules, "id"),
    cables: [],
    x: data.x,
    y: data.y,
    scale: data.scale,
  }

  results.cables = apiCables.map(c => CableBuilder(c, results.modules))

  return results
}