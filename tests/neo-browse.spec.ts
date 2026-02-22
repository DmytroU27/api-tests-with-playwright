import { test, expect } from './fixtures/base';
import { neoBrowseResponseSchema } from '@schemas/neo-browse.schema';
import { validateResponseBySchema } from '@utils/response-validator';

/**
 * Asteroids - NeoWs - Neo - Browse
 * @see https://api.nasa.gov/
 * GET /neo/rest/v1/neo/browse?api_key=API_KEY
 * Browse the overall Asteroid data-set.
 */

test.describe('GET neo browse request', () => {
  test('should return 200 OK', async ({ api }) => {
    const res = await api.neoController.getBrowse();
    expect(res.status()).toBe(200);
  });

  test('should return JSON that matches the schema', async ({ api }) => {
    const res = await api.neoController.getBrowse();
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    validateResponseBySchema(body, neoBrowseResponseSchema);
  });

  test('should return application/json', async ({ api }) => {
    const res = await api.neoController.getBrowse();
    const contentType = res.headers()['content-type'];
    expect(contentType).toMatch(/application\/json/);
  });

  test('should return "API_KEY_INVALID" error when api_key is invalid', async ({
    api,
  }) => {
    const res = await api.neoController.getBrowse({ apiKey: 'invalid' });
    expect(res.status()).toBe(403);

    const body = await res.json();
    expect(body).toEqual({
      error: {
        code: 'API_KEY_INVALID',
        message:
          'An invalid api_key was supplied. Get one at https://api.nasa.gov:443',
      },
    });
  });

  test('should accept page parameter', async ({ api }) => {
    const page = 15;
    const res = await api.neoController.getBrowse({ page });
    expect(res.status()).toBe(200);

    const body = await res.json();
    validateResponseBySchema(body, neoBrowseResponseSchema);
    
    expect(body.page.number).toBe(page);
  });

  test('should accept size parameter', async ({ api }) => {
    const size = 5;
    const res = await api.neoController.getBrowse({ size });
    expect(res.status()).toBe(200);

    const body = await res.json();
    validateResponseBySchema(body, neoBrowseResponseSchema);

    expect(body.page.size).toBe(size);
    expect(body.near_earth_objects.length).toBeLessThanOrEqual(size);
  });

  test('should accept page and size together', async ({ api }) => {
    const [page, size] = [11, 17];
    const res = await api.neoController.getBrowse({ page, size });
    expect(res.status()).toBe(200);

    const body = await res.json();
    validateResponseBySchema(body, neoBrowseResponseSchema);

    expect(body.page.number).toBe(page);
    expect(body.page.size).toBe(size);
    expect(body.near_earth_objects.length).toBeLessThanOrEqual(size);
  });

  test('size greater than 20 is capped at 20', async ({ api }) => {
    const res = await api.neoController.getBrowse({ size: 100 });
    expect(res.status()).toBe(200);

    const body = await res.json();
    validateResponseBySchema(body, neoBrowseResponseSchema);

    const maxSize = 20;
    expect(body.page.size).toBe(maxSize);
    expect(body.near_earth_objects.length).toBeLessThanOrEqual(maxSize);
  });
});
