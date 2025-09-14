import type { ApiModule } from "../core/api/ApiModule.type.js";
import type { ApiSynthesizer } from "../core/api/ApiSynthesizer.type.js";
import type { Synthesizer } from "../core/business/Synthesizer.type.js";
import { ModuleFactory } from "./ModuleFactory.js";

export async function SynthesizerBuilder(
  request: Promise<ApiSynthesizer>,
  modulesRequest: Promise<ApiModule[]>
): Promise<Synthesizer> {
  const data: ApiSynthesizer = await request;
  return {
    voices: data.voices,
    name: data.name,
    id: data.id,
    modules: (await modulesRequest).map(ModuleFactory),
    cables: [],
    ports: {}
  }
}