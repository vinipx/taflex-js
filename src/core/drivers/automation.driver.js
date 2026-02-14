/**
 * Base class for all automation drivers in the TAFLEX JS framework.
 * Provides a unified, platform-agnostic API for Web, API, and Mobile automation.
 * All strategy-specific drivers must extend this class and implement its methods.
 * @abstract
 */
export class AutomationDriver {
  /**
   * Initializes the driver with the provided configuration.
   * @param {object} config - Configuration object containing environment settings.
   * @returns {Promise<any>} The initialized underlying driver instance (e.g., Playwright Page).
   * @abstract
   */
  async initialize() {
    throw new Error('initialize() must be implemented');
  }

  /**
   * Terminates the driver session and performs cleanup.
   * @returns {Promise<void>}
   * @abstract
   */
  async terminate() {
    throw new Error('terminate() must be implemented');
  }

  /**
   * Navigates to a specific URL or activity.
   * @param {string} url - The URL or target destination.
   * @returns {Promise<void>}
   * @abstract
   */
  async navigateTo(_urlKey) {
    throw new Error('navigateTo() must be implemented');
  }

  /**
   * Finds an element using its logical name resolved through the LocatorManager.
   * @param {string} logicalName - The logical name of the element as defined in JSON locators.
   * @returns {Promise<any>} A wrapped element instance (e.g., PlaywrightElement).
   * @abstract
   */
  async findElement(_logicalName) {
    throw new Error('findElement() must be implemented');
  }

  /**
   * Loads locators for a specific page or feature.
   * @param {string} pageName - The name of the page to load locators for.
   * @returns {Promise<void>}
   * @abstract
   */
  async loadLocators(_pageName) {
    throw new Error('loadLocators() must be implemented');
  }

  /**
   * Gets the current execution mode of the driver.
   * @returns {string} The execution mode ('web', 'api', or 'mobile').
   * @abstract
   */
  getExecutionMode() {
    throw new Error('getExecutionMode() must be implemented');
  }

  /**
   * Captures a screenshot and attaches it to the active reports.
   * @param {string} name - Descriptive name for the screenshot.
   * @returns {Promise<Buffer|string>} The captured screenshot.
   * @abstract
   */
  async captureScreenshot(_name) {
    throw new Error('captureScreenshot() must be implemented');
  }
}
