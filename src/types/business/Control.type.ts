import type { ComponentName, GenericKnob } from "../api/ApiControl.type";
import type { Cable } from "./Cable.type";
import type { Module } from "./Module.type";
import type { Parameter } from "./Parameter.type";
import type { Port as ModulePort } from "./Port.type"

type InstanciatedControl<name extends ComponentName, T> = GenericKnob<name, T> & { module: Module }

export type SmallKnob = InstanciatedControl<"SmallKnob", Parameter>
export type Knob = InstanciatedControl<"Knob", Parameter>
export type LargeKnob = InstanciatedControl<"LargeKnob", Parameter>
export type Port = InstanciatedControl<"Port", ModulePort> & { cable?: Cable }

export type Control = (SmallKnob | Knob | LargeKnob | Port)