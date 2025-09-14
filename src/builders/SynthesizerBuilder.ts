import type { ApiSynthesizer } from "../core/api/ApiSynthesizer.type.js";
import type { Synthesizer } from "../core/business/Synthesizer.type.js";

export async function SynthesizerBuilder(request: Promise<ApiSynthesizer>): Promise<Synthesizer> {
  const data: ApiSynthesizer = await request;
  return {
    voices: data.voices,
    name: data.name,
    id: data.id,
    modules: [],
    cables: [],
    ports: {}
  }
}