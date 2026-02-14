/**
 * Utility class responsible for building platform-specific capabilities
 * for cloud-based testing providers like BrowserStack and SauceLabs.
 */
export class CapabilityBuilder {
  /**
   * Builds capabilities for Web automation based on framework configuration.
   * Handles browser, OS, and cloud-provider-specific options.
   * @param {object} config - Configuration object from ConfigManager.
   * @returns {object} Formatted capabilities object for Playwright connection.
   */
  static buildWebCapabilities(config) {
    const caps = {
      browserName: config.BROWSER,
      browserVersion: config.BROWSER_VERSION,
    };

    if (config.CLOUD_PLATFORM === "browserstack") {
      caps["bstack:options"] = {
        userName: config.CLOUD_USER,
        accessKey: config.CLOUD_KEY,
        os: config.OS || "Windows",
        osVersion: config.OS_VERSION || "11",
        projectName: "Taflex Framework",
        buildName: `Build - ${new Date().toLocaleDateString()}`,
        sessionName: "Playwright Web Test",
      };
    } else if (config.CLOUD_PLATFORM === "saucelabs") {
      caps["sauce:options"] = {
        username: config.CLOUD_USER,
        accessKey: config.CLOUD_KEY,
        platformName: config.OS || "Windows 11",
        name: "Playwright Web Test",
        build: `Build - ${new Date().toLocaleDateString()}`,
      };
    }

    return caps;
  }

  /**
   * Builds configuration and capabilities for Mobile automation using WebdriverIO.
   * @param {object} config - Configuration object from ConfigManager.
   * @returns {object} Formatted configuration object for WebdriverIO remote connection.
   */
  static buildMobileConfig(config) {
    const wdioConfig = {
      user: config.CLOUD_USER,
      key: config.CLOUD_KEY,
      capabilities: {
        platformName: config.OS || "Android",
        "appium:deviceName": config.OS_VERSION || "Google Pixel 7",
        "appium:automationName":
          config.OS === "iOS" ? "XCUITest" : "UiAutomator2",
      },
    };

    if (config.CLOUD_PLATFORM === "browserstack") {
      wdioConfig.capabilities["bstack:options"] = {
        projectName: "Taflex Framework",
        buildName: `Mobile Build - ${new Date().toLocaleDateString()}`,
        sessionName: "WebdriverIO Mobile Test",
      };
    } else if (config.CLOUD_PLATFORM === "saucelabs") {
      wdioConfig.capabilities["sauce:options"] = {
        name: "WebdriverIO Mobile Test",
        build: `Mobile Build - ${new Date().toLocaleDateString()}`,
      };
    }

    return wdioConfig;
  }
}
