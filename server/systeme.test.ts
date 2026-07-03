/**
 * Systeme.io integration tests
 * Validates that the SYSTEME_IO_API_KEY is set and the API is reachable.
 * Does NOT create real contacts — uses a read-only endpoint.
 */
import { describe, expect, it } from "vitest";

describe("Systeme.io API key", () => {
  it("SYSTEME_IO_API_KEY is set in environment", () => {
    const key = process.env.SYSTEME_IO_API_KEY;
    expect(key).toBeTruthy();
    expect(typeof key).toBe("string");
    expect((key as string).length).toBeGreaterThan(10);
  });

  it(
    "Systeme.io API key is valid and contacts endpoint returns 200",
    async () => {
      const key = process.env.SYSTEME_IO_API_KEY;
      const response = await fetch("https://api.systeme.io/api/contacts", {
        headers: {
          "X-API-Key": key as string,
          accept: "application/json",
        },
      });
      expect(response.status).toBe(200);
      const data = (await response.json()) as { items: unknown[] };
      expect(data).toHaveProperty("items");
      expect(Array.isArray(data.items)).toBe(true);
    },
    15_000
  );
});
