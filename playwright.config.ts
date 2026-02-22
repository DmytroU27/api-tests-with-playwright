import { defineConfig } from '@playwright/test';

const BASE_URL = 'https://api.nasa.gov';

const isCI = !!process.env.CI

export default defineConfig({
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [['html', { open: 'never' }], ['list']] : [['list']],
  workers: isCI ? 2 : undefined,
  use: {
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
    trace: isCI ? 'on-first-retry' : 'off',
  },
  projects: [
    {
      name: 'api',
      use: {},
    },
  ]
});
