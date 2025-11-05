import type { Identified } from "../utils/Identified.type";

export type ComponentName = "SmallKnob"|"Knob"|"LargeKnob"

type KnobPayload<Target> = { x: number, y: number, target: Target, label: string }

export type GenericKnob<T extends ComponentName, Target = string> = { component: T, payload: KnobPayload<Target> }

export type ControlTemplate<T> = Identified & (
  | GenericKnob<'SmallKnob', T>
  | GenericKnob<'Knob', T>
  | GenericKnob<'LargeKnob', T>
)

export type ApiControl = ControlTemplate<string>