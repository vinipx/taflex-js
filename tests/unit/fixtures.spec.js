import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock playwright-bdd
const mockBase = {
  extend: vi.fn((extensions) => {
    return { ...mockBase, extensions };
  }),
};

vi.mock('playwright-bdd', () => ({
  test: mockBase,
}));

// Mock DriverFactory and configManager
vi.mock('../../src/core/drivers/driver.factory.js', () => ({
  DriverFactory: {
    create: vi.fn(),
  },
}));

vi.mock('../../src/config/config.manager.js', () => ({
  configManager: {
    get: vi.fn(),
  },
}));

describe('Fixtures - Driver Logic', () => {
  let testObj;

  beforeEach(async () => {
    vi.clearAllMocks();
    // Dynamically import fixtures to trigger the mocks
    const fixtures = await import('../fixtures.js');
    testObj = fixtures.test;
  });

  it('should extend base test with driver fixture', () => {
    expect(mockBase.extend).toHaveBeenCalled();
    expect(testObj.extensions).toHaveProperty('driver');
  });

  it('should initialize driver correctly within fixture', async () => {
    const { driver: driverFixture } = testObj.extensions;
    const mockDriver = {
      initialize: vi.fn(),
      terminate: vi.fn(),
    };

    const { DriverFactory } = await import('../../src/core/drivers/driver.factory.js');
    const { configManager } = await import('../../src/config/config.manager.js');

    vi.mocked(DriverFactory.create).mockReturnValue(mockDriver);
    vi.mocked(configManager.get).mockImplementation((key) => {
      if (key === 'BROWSER') return 'chromium';
      if (key === 'HEADLESS') return true;
      return 'http://api.test';
    });

    const use = vi.fn();

    // Execute the fixture function
    await driverFixture({ mode: 'web' }, use);

    expect(DriverFactory.create).toHaveBeenCalledWith('web');
    expect(mockDriver.initialize).toHaveBeenCalledWith(
      expect.objectContaining({
        browserType: 'chromium',
        headless: true,
      })
    );
    expect(use).toHaveBeenCalledWith(mockDriver);
    expect(mockDriver.terminate).toHaveBeenCalled();
  });
});
