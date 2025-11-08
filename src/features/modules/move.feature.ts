import { ModuleBox } from "../../types/business/Module.type";
import { Coordinates } from "../../utils/geometry/Coordinates.type";

function collides(
  collider: ModuleBox,
  { id, rack, slot, slots }: ModuleBox,
): boolean {
  if (collider.id === id) return false;
  if (rack !== collider.rack) return false;
  if (collider.slot >= slot + slots) return false;
  if (slot >= collider.slot + collider.slots) return false;
  return true;
}

export function moveModule() {
  return async (
    module: ModuleBox,
    { x, y }: Coordinates,
    colliders: ModuleBox[] = []
  ) => {
    const slot = (x - (x % 20)) / 20;
    const rack = (y - (y % 400)) / 400;
    const futureModule: ModuleBox = { ...module, rack, slot };
    if (Object.values(colliders).some((c) => collides(c, futureModule))) return;
    module.slot = slot;
    module.rack = rack;
  };
}