import type { GenericKnob } from "../api/ApiControl.type";
import { Identified } from "../utils/Identified.type";
import type { Parameter } from "./Parameter.type";

export type SmallKnob = GenericKnob<"SmallKnob", Parameter>
export type Knob = GenericKnob<"Knob", Parameter>
export type LargeKnob = GenericKnob<"LargeKnob", Parameter>

export type Control = Identified & (SmallKnob | Knob | LargeKnob)