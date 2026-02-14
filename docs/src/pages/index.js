import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HeroBanner() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>Enterprise Test Automation</div>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>
            Unified Test Automation Framework for Web, API &amp; Mobile
          </p>
          <p className={styles.heroDescription}>
            A modern, enterprise-grade framework powered by Node.js (ESM), the Strategy
            Pattern, and externalized configuration — delivering unified test
            orchestration across every platform with zero code changes.
          </p>
          <div className={styles.heroButtons}>
            <Link className={styles.heroPrimary} to="/docs/getting-started/quickstart">
              Get Started →
            </Link>
            <Link className={styles.heroSecondary} to="/docs/architecture/overview">
              View Architecture
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

const capabilityFeatures = [
  {
    badge: 'WEB',
    color: '#2563eb',
    title: 'Web Testing (Playwright)',
    description:
      'Playwright-powered browser automation with externalized locators, auto-wait strategies, and cross-browser support out of the box.',
  },
  {
    badge: 'API',
    color: '#22c55e',
    title: 'API Testing (Dual Strategy)',
    description:
      'Powerful API support using Playwright (Hybrid) for E2E flows and Axios (Specialized) with Vitest for high-speed standalone contract testing.',
  },
  {
    badge: 'MOBILE',
    color: '#8b5cf6',
    title: 'Mobile Testing (WDIO)',
    description:
      'Native and hybrid mobile testing via WebdriverIO with shared locator management, parallel execution, and unified driver interface.',
  },
  {
    badge: 'CLOUD',
    color: '#0ea5e9',
    title: 'Cloud Grids Support',
    description:
      'Native integration with BrowserStack and SauceLabs to execute tests across thousands of real devices and browser combinations.',
  },
  {
    badge: 'DATA',
    color: '#f59e0b',
    title: 'Database Integration',
    description:
      'Native Postgres and MySQL support for test data setup, validation, and teardown — fully integrated into the test lifecycle.',
  },
];

const coreFeatures = [
  {
    icon: '🧩',
    title: 'Strategy Pattern Architecture',
    description:
      'Runtime driver resolution lets you switch between Web, API, and Mobile contexts. Native BDD support via Gherkin for human-readable specifications.',
  },
  {
    icon: '📄',
    title: 'Externalized Locators',
    description:
      'All selectors stored in JSON files with Global -> Mode -> Page inheritance. Change locators without touching a single test file.',
  },
  {
    icon: '⚡',
    title: 'Fast Execution',
    description:
      'Built on top of Playwright and Node.js for maximum performance and reliability on CI/CD pipelines and local development.',
  },
  {
    icon: '📊',
    title: 'Modern Reporting',
    description:
      'Native Allure, ReportPortal, and Playwright HTML reporter integration with detailed traces and videos for enterprise-level visibility.',
  },
  {
    icon: '🛡️',
    title: 'Type-Safe Configuration',
    description:
      'Environment validation using Zod ensures your framework is always correctly configured before tests even start.',
  },
  {
    icon: '🧹',
    title: 'Code Hygiene & Quality',
    description:
      'Strict linting and formatting via ESLint and Prettier. Maintain a clean, professional codebase automatically on every commit.',
  },
  {
    icon: '🚀',
    title: 'CI/CD Ready',
    description:
      'Pre-configured GitHub Actions workflows for automated testing and documentation deployment to GitHub Pages.',
  },
];

const techStack = [
  { name: 'Node.js', desc: 'Runtime (ESM)' },
  { name: 'Playwright', desc: 'Web & Hybrid API' },
  { name: 'Axios', desc: 'Specialized API' },
  { name: 'WebdriverIO', desc: 'Mobile' },
  { name: 'Vitest', desc: 'Unit Testing' },
  { name: 'Gherkin', desc: 'BDD Specifications' },
  { name: 'Zod', desc: 'Validation' },
  { name: 'Allure', desc: 'Reporting' },
  { name: 'ReportPortal', desc: 'Enterprise Reporting' },
  { name: 'BrowserStack', desc: 'Cloud Execution' },
  { name: 'SauceLabs', desc: 'Cloud Execution' },
  { name: 'ESLint', desc: 'Linting' },
  { name: 'Prettier', desc: 'Formatting' },
];

function CapabilitiesSection() {
  return (
    <section className={styles.capabilities}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Multi-Platform Coverage</h2>
          <p>Test across every platform channel in a single unified framework</p>
        </div>
        <div className={styles.capabilityGrid}>
          {capabilityFeatures.map((item, idx) => (
            <div key={idx} className={styles.capabilityCard}>
              <span className={styles.capabilityBadge} style={{ backgroundColor: item.color }}>
                {item.badge}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className={styles.architecture}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Strategy-Driven Architecture</h2>
          <p>Clean separation of concerns with runtime driver resolution</p>
        </div>
        <div className={styles.archDiagram}>
          <div className={styles.archLayer} data-layer="4">
            <div className={styles.archLabel}>Layer 4 — Test Definition</div>
            <div className={styles.archClasses}>
              Playwright Test · Test Specs · Assertions · Allure
            </div>
          </div>
          <div className={styles.archLayer} data-layer="3">
            <div className={styles.archLabel}>Layer 3 — Configuration</div>
            <div className={styles.archClasses}>
              JSON Locators · Zod Environment · Driver Factory
            </div>
          </div>
          <div className={styles.archLayer} data-layer="2">
            <div className={styles.archLabel}>Layer 2 — Strategy Core</div>
            <div className={styles.archClasses}>
              AutomationDriver Interface · Strategy Implementation · Context Manager
            </div>
          </div>
          <div className={styles.archLayer} data-layer="1">
            <div className={styles.archLabel}>Layer 1 — Platform Adapters</div>
            <div className={styles.archClasses}>
              Playwright (Web/API) · Axios (API) · WebdriverIO (Mobile) · PG/MySQL (DB)
            </div>
          </div>
        </div>
        <div className={styles.archCta}>
          <Link to="/docs/architecture/overview">Explore Full Architecture →</Link>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Built for Enterprise</h2>
          <p>Production-grade capabilities for mission-critical test automation</p>
        </div>
        <div className={styles.featuresGrid}>
          {coreFeatures.map((item, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureIcon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section className={styles.techStack}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Technology Stack</h2>
          <p>Modern, battle-tested libraries for enterprise reliability</p>
        </div>
        <div className={styles.techGrid}>
          {techStack.map((item, idx) => (
            <div key={idx} className={styles.techPill}>
              <span className={styles.techName}>{item.name}</span>
              <span className={styles.techDesc}>{item.desc}</span>
            </div>
          ))}
        </div>
        <div className={styles.archCta}>
          <Link to="/docs/getting-started/quickstart">View Full Setup Guide →</Link>
        </div>
      </div>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section className={styles.quickStart}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Quick Start</h2>
          <p>Up and running in under a minute</p>
        </div>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`# Clone the repository
git clone https://github.com/vinipx/taflex-js.git
cd taflex-js

# Install dependencies
npm install

# Run all tests
npm test

# Run unit tests
npm run test:unit`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Enterprise Test Automation Framework"
      description="TAFLEX JS — Unified, enterprise-grade test automation framework for Web, API, and Mobile in JavaScript."
    >
      <HeroBanner />
      <main>
        <CapabilitiesSection />
        <ArchitectureSection />
        <FeaturesSection />
        <TechStackSection />
        <QuickStartSection />
      </main>
    </Layout>
  );
}
