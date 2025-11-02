import { Identified } from "../utils/Identified.type";

type ApiSmallKnob = { component: "SmallKnob", payload: { target: string, x: number, y: number, label: string } }

export type ApiControl = Identified & (
  ApiSmallKnob
)