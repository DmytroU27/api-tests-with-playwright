import { test, expect } from './fixtures/base';
import { neoFeedResponseSchema } from '@schemas/neo-feed.schema';
import { validateResponseBySchema } from '@utils/response-validator';

/**
 * Asteroids - NeoWs - Neo - Feed
 * @see https://api.nasa.gov/
 * GET /neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY
 * Retrieve a list of Asteroids based on their closest approach date to Earth.
 */

test.describe('GET neo feed request', () => {
  test('should return 200 OK', async ({ api }) => {
    const res = await api.neoController.getFeed({ startDate: '2026-09-07' });
    expect(res.status()).toBe(200);
  });

  test('should return JSON that matches the schema', async ({ api }) => {
    const res = await api.neoController.getFeed({ startDate: '2026-09-07' });
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    validateResponseBySchema(body, neoFeedResponseSchema);
  });

  test('should return application/json', async ({ api }) => {
    const res = await api.neoController.getFeed({ startDate: '2026-09-07' });
    const contentType = res.headers()['content-type'];
    expect(contentType).toMatch(/application\/json/);
  });

  test('should return data for 7 days after start_date, when end_date is omitted', async ({
    api,
  }) => {
    const startDate = '2026-09-07';
    const res = await api.neoController.getFeed({ startDate });
    expect(res.status()).toBe(200);

    const body = await res.json();
    validateResponseBySchema(body, neoFeedResponseSchema);

    const dateKeys = Object.keys(body.near_earth_objects).sort();
    expect(dateKeys.length).toBeGreaterThan(0);
    const expectedEndDate = '2026-09-14';
    for (const date of dateKeys) {
      expect(date >= startDate && date <= expectedEndDate).toBe(true);
    }
  });

  test('should accept start_date and end_date range', async ({ api }) => {
    const res = await api.neoController.getFeed({
      startDate: '2026-09-07',
      endDate: '2026-09-10',
    });
    expect(res.status()).toBe(200);

    const body = await res.json();
    validateResponseBySchema(body, neoFeedResponseSchema);

    const dateKeys = Object.keys(body.near_earth_objects).sort();
    expect(dateKeys.length).toBeGreaterThan(0);
    for (const date of dateKeys) {
      expect(date >= '2026-09-07' && date <= '2026-09-10').toBe(true);
    }
  });

  test('should return "API_KEY_INVALID" error when api_key is invalid', async ({
    api,
  }) => {
    const res = await api.neoController.getFeed({
      apiKey: 'invalid',
      startDate: '2026-09-07',
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
});
