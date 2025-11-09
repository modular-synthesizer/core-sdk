import { describe, expect, vi, it } from "vitest";
import { createFetcher } from "../../src/api/createFetcher"
import { UnauthenticatedException } from "../../src/api/UnauthenticatedException";

describe("createFetcher", () => {
  describe("When the underlying API correctly returns", () => {
    const fetch = vi.fn().mockImplementation(() => ({
      status: 200,
      json: () => ({ test: "test_value" })
    }))
    const fetcher = createFetcher<{ test: string }>(fetch)

    it("Correctly returns the desired item", async () => {
      expect(await fetcher("GET", "/test1")).toEqual({ ok: true, data: { test: "test_value" } })
    })
  })
  describe("When the user is no longer authenticated", () => {
    const fetch = vi.fn().mockImplementation(() => ({
      status: 403,
      json: () => ({ key: "session_id", message: "forbidden" })
    }))
    const fetcher = createFetcher<string>(fetch)

    it("Correctly returns an error formatted as desired", async () => {
      await expect(fetcher("GET", "/test2")).rejects.toThrowError(UnauthenticatedException)
    })
  })
  describe("When the underlying API returns an error code", () => {
    const fetch = vi.fn().mockImplementation(() => ({
      status: 400,
      json: () => ({ key: "special_key", message: "test_message" })
    }))
    const fetcher = createFetcher<string>(fetch)

    it("Correctly returns an error formatted as desired", async () => {
      expect(await fetcher("GET", "/test3")).toEqual({ ok: false, key: "special_key", message: "test_message" })
    })
  })
  describe("When the underlying API throws an exception", () => {
    const fetch = vi.fn().mockImplementation(() => {
      throw new Error("long_message")
    })
    const fetcher = createFetcher<string>(fetch)

    it("Correctly returns an error formatted as desired", async () => {
      expect(await fetcher("GET", "/test4")).toEqual({ ok: false, key: "unknown", message: "long_message" })
    })
  })
})