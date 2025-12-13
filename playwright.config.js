// @ts-check
const { devices } = require('@playwright/test');
const path = require('path');
const os = require('os');

const ROOT = 'C:\\Users\\raxit\\WebstormProjects\\OpenBank';

const config = {
  testDir: './tests',
  workers: 1,
  retries: 1,
  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  outputDir: path.join(ROOT, 'playwright-artifacts'),

  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 30 * 1000,
    navigationTimeout: 30 * 1000,
  },

  reporter: [
    ['list'], // Console output
    ['allure-playwright', {
      outputFolder: path.join(ROOT, 'allure-results'),
      detail: true,
      suiteTitle: true,
      environmentInfo: {
        'Environment': process.env.TEST_ENV || 'Local',
        'Browser': 'Multi-browser',
        'OS': os.platform(),
        'Node': process.version,
        'Test Date': new Date().toLocaleDateString()
      }
    }]
  ],

  projects: [
    {
      name: 'firefox',
      use: { browserName: 'firefox', headless: true }
    },
    {
      name: 'chrome',
      use: { browserName: 'chromium', channel: 'chrome', headless: true }
    },
    {
      name: 'edge',
      use: { browserName: 'chromium', channel: 'msedge', headless: true }
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit', headless: true }
    }
  ]
};

module.exports = config;