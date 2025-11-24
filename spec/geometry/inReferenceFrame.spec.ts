import { describe, expect, test } from "vitest"
import { inReferenceFrame } from "../../src/utils/geometry/inReferenceFrame"

function coords(x: number, y: number): MouseEvent {
  return { clientX: x, clientY: y } as MouseEvent
}

describe("inReferenceFrame", () => {
  test("gives the correct coordinates if the reference frame in neither moved nor zoomed", () => {
    const result = inReferenceFrame(coords(10, 20), { x: 0, y: 0, scale: 1.0 })
    expect(result).toEqual({ x: 10, y: 20 })
  })
  test("gives the correct coordinates if the reference frame is moved", () => {
    const result = inReferenceFrame(coords(10, 20), { x: 10, y: 20, scale: 1.0 })
    expect(result).toEqual({ x: 0, y: 0 })
  })
  test("gives the correct coordinates if the reference frame is zoomed", () =>  {
    const result = inReferenceFrame(coords(10, 20), { x: 0, y: 0, scale: 2.0 })
    expect(result).toEqual({ x: 5, y: 10 })
  })
  test("gives the correct coordinates if the reference frame is moved and zoomed", () => {
    const result = inReferenceFrame(coords(10, 20), { x: 10, y: 20, scale: 2.0 })
    expect(result).toEqual({ x: -5, y: -10 })
  })
  test("gives the correct coordinates even with negative numbers", () => {
    const result = inReferenceFrame(coords(-10, -20), { x: 10, y: 20, scale: 2.0 })
    expect(result).toEqual({ x: -15, y: -30 })
  })
})