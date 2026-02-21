import { test, expect } from '@playwright/test';
import { ApiClient } from '@api';
import { insightWeatherResponseSchema } from '@schemas/insight-weather.schema';
import { validateResponseBySchema } from "@utils/response-validator";

/**
 * InSight Mars Weather Service API
 * @see https://api.nasa.gov/
 * @see https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf
 * GET /insight_weather/?api_key=...&feedtype=json&ver=1.0
 * Returns per-Sol summary data for the last seven available Sols (Martian days).
 */

test.describe('GET insight_weather', () => {
  let apiClient: ApiClient;

  test.beforeEach(({ request }) => {
    apiClient = new ApiClient(request);
  });

  test('should return 200 OK', async () => {
    const res = await apiClient.insightController.getWeather();
    expect(res.status()).toBe(200);
  });

  test('should return JSON that matches the schema', async () => {
    const res = await apiClient.insightController.getWeather();
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    validateResponseBySchema(body, insightWeatherResponseSchema);
  });

  test('should return application/json', async () => {
    const res = await apiClient.insightController.getWeather();
    const contentType = res.headers()['content-type'];
    expect(contentType).toMatch(/application\/json/);
  });

  test('should return between 1 and 7 sols (last seven available per API docs)', async () => {
    const res = await apiClient.insightController.getWeather();
    const body = await res.json();

    expect(body.sol_keys.length).toBeGreaterThanOrEqual(1);
    expect(body.sol_keys.length).toBeLessThanOrEqual(7);
  });

  test('every sol in sol_keys should have a corresponding data object', async () => {
    const res = await apiClient.insightController.getWeather();
    const body = await res.json();

    for (const solKey of body.sol_keys) {
      expect(body[solKey], `Missing data for sol ${solKey}`).toBeDefined();
    }
  });
});
