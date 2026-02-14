<h1 align="center">TAFLEX JS</h1>

<div align="center">

[![Build Status](https://github.com/vinipx/taflex-js/actions/workflows/js-ci.yml/badge.svg?branch=main)](https://github.com/vinipx/taflex-js/actions)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white)](https://zod.dev/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](https://github.com/features/actions)

**A high-performance, modular automation framework for Web, API, and Mobile testing.**

[Documentation](https://vinipx.github.io/taflex-js/) • [Report Bug](https://github.com/vinipx/taflex-js/issues) • [Request Feature](https://github.com/vinipx/taflex-js/issues)

</div>

---

## 🎯 Objective

**TAFLEX JS** is an enterprise-grade automation framework engineered to unify Web, API, and Mobile testing into a single, cohesive developer experience. Migrated from the original Java-based **TAFLEX** architecture, this version leverages the modern **Node.js (ESM)** ecosystem to deliver significantly faster execution, robust type-safety, and seamless CI/CD integration. 

The primary goal is to provide a platform-agnostic API that allows QA engineers to write tests once and execute them across multiple environments with minimal configuration overhead.

## 🏛️ Architecture

TAFLEX JS follows a strict **Strategy Pattern** architecture, ensuring that the core logic remains decoupled from the underlying automation engines.

### Core Components:
- **Unified Driver Layer (`AutomationDriver`)**: Provides a standardized interface for navigation, element discovery, and session management.
- **Driver Factory**: Orchestrates the instantiation of platform-specific strategies (`Playwright`, `WebdriverIO`) based on the execution context.
- **Hierarchical Locator Manager**: A sophisticated resolution engine that merges locators from JSON files following an inheritance model: `Global ➔ Mode ➔ Page`.
- **Unified Element Wrapper**: A platform-agnostic element API that abstracts away the differences between Playwright's `Locator` and WebdriverIO's `Element`.

## 🚀 Key Features

- 🌐 **Unified Multi-Platform Support**: Automate Web, REST APIs, and Mobile (Android/iOS) using the same patterns.
- ☁️ **Cloud Grid Integration**: Native support for **BrowserStack** and **SauceLabs**, enabling execution across thousands of real devices and browser combinations.
- 📂 **Hierarchical Locator Management**: Centralize and reuse locators across the entire project with JSON-based inheritance.
- 🛡️ **Type-Safe Configuration**: Environment variables are validated at runtime using **Zod**, preventing "hidden" configuration bugs.
- 🗄️ **Integrated Database Manager**: Native support for executing and validating queries against **PostgreSQL** and **MySQL**.
- 📊 **Enterprise Reporting**: Plug-and-play support for **Allure**, **EPAM ReportPortal**, and Playwright HTML reports.
- 🧹 **Code Hygiene**: Integrated **ESLint** and **Prettier** to ensure consistent code quality and style across the project.
- 🤖 **CI/CD Ready**: Pre-configured GitHub Actions for automated testing and Docusaurus documentation deployment.

## 🛠️ Quick Start

### 1. Installation
The easiest way to get started is using the provided setup script:

```bash
# Clone the repository
git clone https://github.com/vinipx/taflex-js.git
cd taflex-js

# Run the automated setup (installs deps, browsers, and configures .env)
./setup.sh
```

### 2. Execution
```bash
# Run Integration Tests (Playwright)
npm test

# Run Unit Tests (Vitest)
npm run test:unit

# Run Contract Tests (Pact)
npm run test:contract

# Run Linter (ESLint + Prettier)
npm run lint

# Serve Documentation locally
npm run docs
```

## ⚙️ Configuration

The framework uses a `.env` file for environment management. This file is automatically created when running `./setup.sh`. If you are setting up manually, use the `.env.example` as a template:

### Core Settings
| Variable | Description | Default |
| :--- | :--- | :--- |
| `EXECUTION_MODE` | Automation mode: `web`, `api`, or `mobile` | `web` |
| `BROWSER` | Browser for web mode: `chromium`, `firefox`, or `webkit` | `chromium` |
| `HEADLESS` | Run browser in headless mode (`true`/`false`) | `true` |
| `BASE_URL` | Base URL for Web automation | - |
| `API_BASE_URL` | Base URL for API testing | - |
| `API_PROVIDER` | API strategy provider: `playwright` or `axios` | `playwright` |
| `TIMEOUT` | Global timeout in milliseconds | `30000` |

### Cloud Testing Settings
| Variable | Description | Default |
| :--- | :--- | :--- |
| `CLOUD_PLATFORM`| Cloud provider: `local`, `browserstack`, or `saucelabs` | `local` |
| `CLOUD_USER` | Username for the cloud platform | - |
| `CLOUD_KEY` | Access key for the cloud platform | - |
| `BROWSER_VERSION`| Target browser version (e.g., `latest`, `110`) | `latest` |
| `OS` | Operating System (e.g., `Windows`, `OS X`, `Android`, `iOS`) | - |
| `OS_VERSION` | OS Version (e.g., `11`, `Ventura`, `13.0`) | - |

### Reporting Settings
| Variable | Description | Default |
| :--- | :--- | :--- |
| `REPORTERS` | Comma-separated reporters: `html`, `allure`, `reportportal`, `xray` | `html` |
| `ALLURE_RESULTS_DIR`| Directory for Allure results | `allure-results` |
| `RP_ENDPOINT` | ReportPortal API endpoint | - |
| `RP_API_KEY` | ReportPortal API Key | - |
| `RP_PROJECT` | ReportPortal Project name | - |
| `RP_LAUNCH` | ReportPortal Launch name | - |
| `RP_ATTRIBUTES` | Semicolon-separated attributes (e.g., `key:val;env:dev`) | - |
| `RP_DESCRIPTION` | ReportPortal Launch description | - |
| `XRAY_ENABLED` | Enable Xray reporting (`true`/`false`) | `false` |
| `XRAY_CLIENT_ID` | Xray Client ID for OAuth2 authentication | - |
| `XRAY_CLIENT_SECRET` | Xray Client Secret for OAuth2 authentication | - |
| `XRAY_PROJECT_KEY` | Jira Project Key for importing results | - |
| `XRAY_TEST_PLAN_KEY` | (Optional) Key of the Test Plan to link execution | - |
| `XRAY_ENVIRONMENT` | (Optional) Name of the execution environment | - |

### Pact Contract Testing Settings
| Variable | Description | Default |
| :--- | :--- | :--- |
| `PACT_ENABLED` | Enable Pact contract testing (`true`/`false`) | `false` |
| `PACT_BROKER_URL` | URL of your Pact Broker | - |
| `PACT_BROKER_TOKEN` | Authentication token for Pact Broker | - |
| `PACT_CONSUMER` | Name of the consumer application | `taflex-consumer` |
| `PACT_PROVIDER` | Name of the provider service | `taflex-provider` |
| `PACT_LOG_LEVEL` | Log level: `debug`, `info`, `warn`, `error` | `info` |

### Database Settings (Optional)
| Variable | Description |
| :--- | :--- |
| `DB_TYPE` | Database type: `postgres` or `mysql` |
| `DB_HOST` | Database host address |
| `DB_PORT` | Database port |
| `DB_USER` | Database username |
| `DB_PASS` | Database password |
| `DB_NAME` | Database name |

---
<div align="center">
Built with ❤️ by <a href="https://github.com/vinipx">vinipx</a> and the TAFLEX Community.
</div>
