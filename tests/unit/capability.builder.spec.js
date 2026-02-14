import { describe, it, expect } from 'vitest';
import { CapabilityBuilder } from '../../src/core/utils/capability.builder.js';

describe('CapabilityBuilder', () => {
  describe('buildWebCapabilities', () => {
    it('should build BrowserStack capabilities correctly', () => {
      const config = {
        BROWSER: 'chromium',
        BROWSER_VERSION: 'latest',
        CLOUD_PLATFORM: 'browserstack',
        CLOUD_USER: 'user123',
        CLOUD_KEY: 'key123',
        OS: 'Windows',
        OS_VERSION: '11',
      };
      const caps = CapabilityBuilder.buildWebCapabilities(config);
      expect(caps.browserName).toBe('chromium');
      expect(caps['bstack:options'].userName).toBe('user123');
      expect(caps['bstack:options'].accessKey).toBe('key123');
      expect(caps['bstack:options'].os).toBe('Windows');
    });

    it('should build SauceLabs capabilities correctly', () => {
      const config = {
        BROWSER: 'firefox',
        BROWSER_VERSION: '110',
        CLOUD_PLATFORM: 'saucelabs',
        CLOUD_USER: 'sauceuser',
        CLOUD_KEY: 'saucekey',
        OS: 'Windows 10',
      };
      const caps = CapabilityBuilder.buildWebCapabilities(config);
      expect(caps.browserName).toBe('firefox');
      expect(caps.browserVersion).toBe('110');
      expect(caps['sauce:options'].username).toBe('sauceuser');
      expect(caps['sauce:options'].platformName).toBe('Windows 10');
    });
  });

  describe('buildMobileConfig', () => {
    it('should build mobile config for BrowserStack correctly', () => {
      const config = {
        CLOUD_PLATFORM: 'browserstack',
        CLOUD_USER: 'user123',
        CLOUD_KEY: 'key123',
        OS: 'Android',
        OS_VERSION: 'Google Pixel 7',
      };
      const wdioConfig = CapabilityBuilder.buildMobileConfig(config);
      expect(wdioConfig.user).toBe('user123');
      expect(wdioConfig.key).toBe('key123');
      expect(wdioConfig.capabilities.platformName).toBe('Android');
      expect(wdioConfig.capabilities['bstack:options']).toBeDefined();
    });
  });
});
