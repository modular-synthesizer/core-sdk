import type { Synthesizer } from "../../types/business/Synthesizer.type";
import type { Coordinates } from "../../utils/geometry/Coordinates.type";
import { updateSynthesizer, type UpdateSynthesizerApi } from "./updateSynthesizer";

export type MoveSynthesizerFeature = (
  synthesizer: Synthesizer|undefined,
  coordinates: Coordinates,
  auth_token: string
) => void

export const moveSynthesizerTemplate = (update: UpdateSynthesizerApi): MoveSynthesizerFeature => {
  return (synthesizer, { x, y }, auth_token) => {
    if (!synthesizer) return
    synthesizer.x = x
    synthesizer.y = y
    update(synthesizer, auth_token)
  }
}

export const moveSynthesizer = moveSynthesizerTemplate(updateSynthesizer)