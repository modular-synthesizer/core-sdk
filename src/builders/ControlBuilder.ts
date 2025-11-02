import { ApiControl } from "../core/api/ApiControl.type";
import { Control } from "../core/business/Control.type";

export function ControlBuilder(control: ApiControl): Control {
  return { id: control.id }
}