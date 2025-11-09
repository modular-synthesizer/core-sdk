import { beforeEach, describe, expect, test } from "vitest"
import { moveModule } from "../../../src/features/modules/move.feature"
import type { ModuleBox } from "../../../src/types/business/Module.type"

const feature = moveModule()

const modules: ModuleBox[] = [
  { id: "1", rack: 0, slot: 20, slots: 12 },
  { id: "2", rack: 3, slot: 5, slots: 12 },
]

describe("Coordinates computation", async () => {

  const module: ModuleBox = { ...modules[0] }

  test("The module is correctly placed to new coordinates", async () => {
    await feature(module, { x: 100, y: 400 })
    expect(module.rack).toBe(1)
    expect(module.slot).toBe(5)
  })

  test("The coordinates are floored to the nearest spot", async () => {
    await feature(module, { x: 119, y: 499 })
    expect(module.rack).toBe(1)
    expect(module.slot).toBe(5)
  })
})

describe("When there are colliding modules given", async () => {

  let module: ModuleBox;
  let collider: ModuleBox;

  beforeEach(async () => {
    module = { ...modules[0] }
    collider = { ...modules[1] }
  })

  test("Skips checks if both modules are the same", async () => {
    await feature(module, { x: 100, y: 800 }, [module])
    expect(module.rack).toBe(2)
    expect(module.slot).toBe(5)
  })
  test("Skips checks both modules are on different racks", async () => {
    await feature(module, { x: 100, y: 800 }, [collider])
    expect(module.rack).toBe(2)
    expect(module.slot).toBe(5)
  })
  test("Both modules are on the same rack, but their slots intersect", async () => {
    const coords = { x: 60, y: 1200 }
    await feature(module, coords, [collider])

    expect(module.rack).toBe(0)
    expect(module.slot).toBe(20)
  })
})