import type { UpdateSynthesizerApi } from "../../api/synthesizers/updateSynthesizer";
import type { Synthesizer } from "../../types/business/Synthesizer.type";

export const saveSynthesizerTemplate = (api: UpdateSynthesizerApi) => {
  return async (synthesizer: Synthesizer, auth_token: string) => {
    return await api(synthesizer, auth_token) 
  }
}