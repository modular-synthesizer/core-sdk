import { getAllCables, getAllCablesApi } from "../../api/cables/getAllCables";
import { getAllModules, getAllModulesApi } from "../../api/modules/getAllModules";
import { getSynthesizer, GetSynthesizerApi } from "../../api/synthesizers/getSynthesizer";
import { SynthesizerBuilder } from "../../builders/SynthesizerBuilder";
import { Synthesizer } from "../../types/business/Synthesizer.type";
import { Eventual } from "../../types/utils/Async";

type SynthesizerFunction = (s: GetSynthesizerApi, m: getAllModulesApi, l: getAllCablesApi) => (id: string, auth_token: string) => Eventual<Synthesizer>

export const SynthesizerFetcherTemplate: SynthesizerFunction = (synthApi, modulesApi, cablesApi) => {
  return async (id, auth_token): Eventual<Synthesizer> => {
    const [dataSynth, dataMods, dataCables] = await Promise.all([
      await synthApi(id, auth_token), modulesApi(id, auth_token), cablesApi(id, auth_token)
    ])
    if (!dataSynth.ok) return undefined

    return SynthesizerBuilder(
      dataSynth.data,
      dataMods.ok ? dataMods.data : [],
      dataCables.ok && dataMods.ok ? dataCables.data : []
    )
  }
}

export const fetchSynthesizer = SynthesizerFetcherTemplate(
  getSynthesizer, getAllModules, getAllCables
)