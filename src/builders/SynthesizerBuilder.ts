import type { ApiCable } from "../core/api/ApiCable.type.js";
import type { ApiModule } from "../core/api/ApiModule.type.js";
import type { ApiSynthesizer } from "../core/api/ApiSynthesizer.type.js";
import type { Module } from "../core/business/Module.type.js";
import type { Synthesizer } from "../core/business/Synthesizer.type.js";
import { indexOn } from "../utils/indexOn.js";
import { CableBuilder } from "./CableBuilder.js";
import { ModuleFactory } from "./ModuleFactory.js";
import { PortBuilder } from "./PortBuilder.js";

export async function SynthesizerBuilder(
  request: Promise<ApiSynthesizer>,
  modulesRequest: Promise<ApiModule[]>,
  cablesRequest: Promise<ApiCable[]>
): Promise<Synthesizer> {
  const [data, apiModules, apiCables] = await Promise.all([request, modulesRequest, cablesRequest])
  const modules = apiModules.map(ModuleFactory)

  const results: Synthesizer = {
    voices: data.voices,
    name: data.name,
    id: data.id,
    modules: indexOn(modules, "id"),
    cables: [],
    ports: {}
  }

  // Trouver un moyen de lui passer le module, et non l'api module, pour le linker correctement.
  const ports = apiModules.flatMap(m => m.ports.map(p => PortBuilder(p, results.modules[m.id] as Module)))
  results.ports = indexOn(ports, "id")
  results.cables = apiCables.map(c => CableBuilder(c, results.ports))

  return results
}