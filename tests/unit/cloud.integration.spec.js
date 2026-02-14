import { describe, it, expect, vi, beforeEach } from "vitest";
import { PlaywrightDriverStrategy } from "../../src/core/drivers/strategies/playwright.strategy.js";
import { WebdriverioMobileStrategy } from "../../src/core/drivers/strategies/webdriverio.mobile.strategy.js";
import { chromium } from "@playwright/test";
import { remote } from "webdriverio";

// Mock Playwright and WebdriverIO
vi.mock("@playwright/test", () => ({
  chromium: {
    connect: vi.fn().mockResolvedValue({
      newContext: vi.fn().mockResolvedValue({
        newPage: vi.fn().mockResolvedValue({}),
      }),
    }),
  },
  firefox: { connect: vi.fn() },
  webkit: { connect: vi.fn() },
}));

vi.mock("webdriverio", () => ({
  remote: vi.fn().mockResolvedValue({
    url: vi.fn(),
    deleteSession: vi.fn(),
  }),
}));

describe("Cloud Integration Logic", () => {
  describe("PlaywrightDriverStrategy (Cloud)", () => {
    let strategy;

    beforeEach(() => {
      strategy = new PlaywrightDriverStrategy();
      vi.clearAllMocks();
    });

    it("should call playwright.connect with BrowserStack endpoint when configured", async () => {
      const config = {
        browserType: "chromium",
        cloudPlatform: "browserstack",
        CLOUD_PLATFORM: "browserstack",
        CLOUD_USER: "user_bs",
        CLOUD_KEY: "key_bs",
        BROWSER: "chromium",
      };

      await strategy.initialize(config);

      expect(chromium.connect).toHaveBeenCalled();
      const wsEndpoint = chromium.connect.mock.calls[0][0];
      expect(wsEndpoint).toContain("wss://cdp.browserstack.com/playwright");
      expect(wsEndpoint).toContain("user_bs");
    });

    it("should call playwright.connect with SauceLabs endpoint when configured", async () => {
      const config = {
        browserType: "chromium",
        cloudPlatform: "saucelabs",
        CLOUD_PLATFORM: "saucelabs",
        CLOUD_USER: "user_sauce",
        CLOUD_KEY: "key_sauce",
        BROWSER: "chromium",
      };

      await strategy.initialize(config);

      expect(chromium.connect).toHaveBeenCalled();
      const wsEndpoint = chromium.connect.mock.calls[0][0];
      expect(wsEndpoint).toContain(
        "wss://ondemand.us-west-1.saucelabs.com/playwright/test",
      );
      expect(wsEndpoint).toContain("user_sauce");
    });
  });

  describe("WebdriverioMobileStrategy (Cloud)", () => {
    let strategy;

    beforeEach(() => {
      strategy = new WebdriverioMobileStrategy();
      vi.clearAllMocks();
    });

    it("should initialize WebdriverIO with cloud capabilities for BrowserStack", async () => {
      const config = {
        cloudPlatform: "browserstack",
        CLOUD_PLATFORM: "browserstack",
        CLOUD_USER: "user_bs",
        CLOUD_KEY: "key_bs",
        OS: "Android",
      };

      await strategy.initialize(config);

      expect(remote).toHaveBeenCalledWith(
        expect.objectContaining({
          user: "user_bs",
          key: "key_bs",
          capabilities: expect.objectContaining({
            "bstack:options": expect.any(Object),
          }),
        }),
      );
    });
  });
});
