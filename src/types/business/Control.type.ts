import type { GenericKnob } from "../api/ApiControl.type";
import type { Parameter } from "./Parameter.type";
import type { Port as ModulePort } from "./Port.type"

export type SmallKnob = GenericKnob<"SmallKnob", Parameter>
export type Knob = GenericKnob<"Knob", Parameter>
export type LargeKnob = GenericKnob<"LargeKnob", Parameter>
export type Port = GenericKnob<"Port", ModulePort>

export type Control = (SmallKnob | Knob | LargeKnob | Port)