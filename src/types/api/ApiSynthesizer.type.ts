import type { ScaledCoordinates } from "../utils/ScaledCoordinates"

export type ApiSynthesizer = ScaledCoordinates & {
  id: string
  name: string
  voices: number
}