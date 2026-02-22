import { test as base } from '@playwright/test';
import { ApiClient } from '@api';

export const test = base.extend<{ api: ApiClient }>({
  api: async ({ request }, use) => {
    await use(new ApiClient(request));
  },
});

export { expect } from '@playwright/test';
