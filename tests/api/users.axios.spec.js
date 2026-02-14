import { describe, it, expect, beforeAll } from "vitest";
import { DriverFactory } from "../../src/core/drivers/driver.factory.js";
import { configManager } from "../../src/config/config.manager.js";

describe("Specialized API Tests (Axios + Vitest)", () => {
  let driver;

  beforeAll(async () => {
    // Force axios provider for this specialized test if needed,
    // or rely on env var API_PROVIDER=axios
    driver = DriverFactory.create("api");

    await driver.initialize({
      apiBaseUrl:
        configManager.get("API_BASE_URL") ||
        "https://jsonplaceholder.typicode.com",
      timeout: configManager.get("TIMEOUT"),
    });
  });

  it("should fetch users list using Axios strategy", async () => {
    const response = await driver.get("/users");

    expect(response.status()).toBe(200);
    expect(response.ok()).toBe(true);

    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty("username");
  });

  it("should handle non-existent resource", async () => {
    const response = await driver.get("/non-existent-resource");
    expect(response.status()).toBe(404);
    expect(response.ok()).toBe(false);
  });
});
