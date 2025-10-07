import type { ApiParameter } from "../core/api/ApiParameter.type";
import type { Module } from "../core/business/Module.type";
import type { Parameter } from "../core/business/Parameter.type";

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