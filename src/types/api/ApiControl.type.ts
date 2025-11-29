import type { Identified } from "../utils/Identified.type";

export type ComponentName = "SmallKnob" | "Knob" | "LargeKnob" | "Port"

type KnobPayload<Target> = { x: number, y: number, target: Target, label: string }

export type GenericKnob<T extends ComponentName, Target = string> = Identified & { component: T, payload: KnobPayload<Target> }

export type ApiControl = (
  | GenericKnob<'SmallKnob', string>
  | GenericKnob<'Knob', string>
  | GenericKnob<'LargeKnob', string>
  | GenericKnob<'Port', string>
)