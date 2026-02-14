import { test, expect } from "@playwright/test";
import { DriverFactory } from "../../src/core/drivers/driver.factory.js";
import { configManager } from "../../src/config/config.manager.js";

test("smoke test - hierarchical locators and element wrapper", async () => {
  const driver = DriverFactory.create();
  const config = {
    browserType: configManager.get("BROWSER"),
    headless: configManager.get("HEADLESS"),
  };

  await driver.initialize(config);
  try {
    await driver.navigateTo("https://www.google.com");

    // Test global locator
    const searchInput = await driver.findElement("search_input");
    expect(searchInput).toBeDefined();

    // Test mode locator
    const logo = await driver.findElement("google_logo");
    expect(logo).toBeDefined();

    await logo.waitFor({ state: "visible", timeout: 5000 });
    const isVisible = await logo.isVisible();
    expect(isVisible).toBe(true);
  } finally {
    await driver.terminate();
  }
});
