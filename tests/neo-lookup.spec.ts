import { test, expect } from './fixtures/base.fixture';
import { neoLookupResponseSchema } from '@schemas/neo-lookup.schema';
import { validateResponseBySchema } from '@utils/response-validator';

/**
 * Asteroids - NeoWs - Neo - Lookup
 * @see https://api.nasa.gov/
 * GET /neo/rest/v1/neo/{asteroid_id}?api_key=API_KEY
 * Look up a specific Asteroid by its NASA JPL small body ID (SPK-ID).
 */

const VALID_ASTEROID_ID = '3542519';

test.describe('GET neo lookup request', () => {
  test('should return 200 OK', async ({ api }) => {
    const res = await api.neoController.getLookup({
      asteroidId: VALID_ASTEROID_ID,
    });
    expect(res.status()).toBe(200);
  });

  test('should return JSON that matches the schema', async ({ api }) => {
    const res = await api.neoController.getLookup({
      asteroidId: VALID_ASTEROID_ID,
    });
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    validateResponseBySchema(body, neoLookupResponseSchema);
  });

  test('should return application/json', async ({ api }) => {
    const res = await api.neoController.getLookup({
      asteroidId: VALID_ASTEROID_ID,
    });
    const contentType = res.headers()['content-type'];
    expect(contentType).toMatch(/application\/json/);
  });

  test('should return NEO with matching id', async ({ api }) => {
    const res = await api.neoController.getLookup({
      asteroidId: VALID_ASTEROID_ID,
    });
    expect(res.status()).toBe(200);

    const body = await res.json();
    validateResponseBySchema(body, neoLookupResponseSchema);

    expect(body.id).toBe(VALID_ASTEROID_ID);
    expect(body.neo_reference_id).toBe(VALID_ASTEROID_ID);
  });

  test('should return "API_KEY_INVALID" error when api_key is invalid', async ({
    api,
  }) => {
    const res = await api.neoController.getLookup({
      asteroidId: VALID_ASTEROID_ID,
      apiKey: 'invalid',
    });
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

  test('should return 404 for non-existent asteroid_id', async ({ api }) => {
    const res = await api.neoController.getLookup({
      asteroidId: '999999999999',
    });
    expect(res.status()).toBe(404);
  });
});
