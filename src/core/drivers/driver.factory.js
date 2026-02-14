import { PlaywrightDriverStrategy } from "./strategies/playwright.strategy.js";
import { PlaywrightApiStrategy } from "./strategies/playwright.api.strategy.js";
import { AxiosApiStrategy } from "./strategies/axios.api.strategy.js";
import { WebdriverioMobileStrategy } from "./strategies/webdriverio.mobile.strategy.js";
import { configManager } from "../../config/config.manager.js";

/**
 * Factory class responsible for instantiating the correct AutomationDriver strategy
 * based on the current execution mode or manual overrides.
 */
export class DriverFactory {
  /**
   * Creates and returns an AutomationDriver instance based on the EXECUTION_MODE.
   * @param {string} [overriddenMode=null] - Optional mode to override the default configuration.
   * @returns {AutomationDriver} An instance of a class extending AutomationDriver.
   * @throws {Error} If the execution mode is unsupported.
   */
  static create(overriddenMode = null) {
    const mode = overriddenMode || configManager.get("EXECUTION_MODE");

    switch (mode) {
      case "web":
        return new PlaywrightDriverStrategy();
      case "api": {
        const provider = configManager.get("API_PROVIDER");
        return provider === "axios"
          ? new AxiosApiStrategy()
          : new PlaywrightApiStrategy();
      }
      case "mobile":
        return new WebdriverioMobileStrategy();
      default:
        throw new Error(`Unsupported execution mode: ${mode}`);
    }
  }
}
