import { SynthesizerBuilder } from "../../builders/SynthesizerBuilder";
import { ApiCable } from "../../types/api/ApiCable.type";
import { ApiModule } from "../../types/api/ApiModule.type";
import { ApiSynthesizer } from "../../types/api/ApiSynthesizer.type";
import { Synthesizer } from "../../types/business/Synthesizer.type";
import { AsyncResult, Eventual } from "../../types/utils/Async";

type SynthesizerApi = (id: string) => AsyncResult<ApiSynthesizer>

type ModulesApi = (id: string) => AsyncResult<ApiModule[]>

type CablesApi = (id: string) => AsyncResult<ApiCable[]>

type SynthesizerFunction = (s: SynthesizerApi, m: ModulesApi, l: CablesApi) => (id: string) => Eventual<Synthesizer>

export const SynthesizerFetcherTemplate: SynthesizerFunction = (synthApi, modulesApi, cablesApi) => {
  return async (id): Eventual<Synthesizer> => {
    const [dataSynth, dataMods, dataCables] = await Promise.all([
      await synthApi(id), modulesApi(id), cablesApi(id)
    ])
    if (!dataSynth.ok) return undefined

    return SynthesizerBuilder(
      dataSynth.data,
      dataMods.ok ? dataMods.data : [],
      dataCables.ok && dataMods.ok ? dataCables.data : []
    )
  }
}