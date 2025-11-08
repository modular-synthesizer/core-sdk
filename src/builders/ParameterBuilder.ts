import type { ApiParameter } from "../types/api/ApiParameter.type";
import type { Module } from "../types/business/Module.type";
import type { Parameter } from "../types/business/Parameter.type";

function ParameterBuilderTemplate() {
  return (data: ApiParameter, module: Module): Parameter => {
    return {
      id: data.id,
      value: data.value,
      name: data.name,
      minimum: data.minimum,
      maximum: data.maximum,
      precision: data.precision,
      field: data.field,
      targets: data.targets.flatMap(name => module.nodes[name]),
      t: new Date(data.t),
      step: data.step
    }
  }
}

export const ParameterBuilder = ParameterBuilderTemplate()