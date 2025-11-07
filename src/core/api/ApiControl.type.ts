import type { Identified } from "../utils/Identified.type";

export type ComponentName = "SmallKnob" | "Knob" | "LargeKnob"

type KnobPayload<Target> = { x: number, y: number, target: Target, label: string }

export type GenericKnob<T extends ComponentName, Target = string> = { component: T, payload: KnobPayload<Target> }

export type ApiControl = Identified & (
  | GenericKnob<'SmallKnob', string>
  | GenericKnob<'Knob', string>
  | GenericKnob<'LargeKnob', string>
)