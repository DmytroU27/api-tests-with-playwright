import { defineConfig } from '@playwright/test';

const BASE_URL = 'https://api.nasa.gov';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  },
  projects: [
    {
      name: 'api',
      use: {},
    },
  ]
});
