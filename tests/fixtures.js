import { test as base } from 'playwright-bdd';
import { DriverFactory } from '../src/core/drivers/driver.factory.js';
import { configManager } from '../src/config/config.manager.js';

export const test = base.extend({
  mode: ['web', { option: true }],
  driver: async ({ mode }, use, testInfo) => {
    const driver = DriverFactory.create(mode);
    const config = {
      browserType: configManager.get('BROWSER'),
      headless: configManager.get('HEADLESS'),
      apiBaseUrl: configManager.get('API_BASE_URL'),
      cloudPlatform: configManager.get('CLOUD_PLATFORM'),
      CLOUD_PLATFORM: configManager.get('CLOUD_PLATFORM'), // Backwards compatibility with CapabilityBuilder expectations
      CLOUD_USER: configManager.get('CLOUD_USER'),
      CLOUD_KEY: configManager.get('CLOUD_KEY'),
      BROWSER: configManager.get('BROWSER'),
      BROWSER_VERSION: configManager.get('BROWSER_VERSION'),
      OS: configManager.get('OS'),
      OS_VERSION: configManager.get('OS_VERSION'),
    };

    await driver.initialize(config);
    driver.testInfo = testInfo;

    await use(driver);

    await driver.terminate();
  },
});

export { expect } from '@playwright/test';
