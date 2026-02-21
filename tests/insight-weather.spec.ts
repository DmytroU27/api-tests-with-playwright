import { test, expect } from '@playwright/test';
import { ApiClient } from '@api';
import { insightWeatherResponseSchema } from '@schemas/insight-weather.schema';
import { validateResponseBySchema } from "@utils/response-validator";
import { text } from 'stream/consumers';

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

  test('should return "API_KEY_INVALID" error', async () => {
    const res = await apiClient.insightController.getWeather({ apiKey: 'invalid' });
    expect(res.status()).toBe(403);

    const body = await res.json();
    expect(body).toEqual({
      error: {
        code: "API_KEY_INVALID",
        message: "An invalid api_key was supplied. Get one at https://api.nasa.gov:443",
      }
    })
  });

  test('should return "not found" message for invalid feedtype', async () => {
    const res = await apiClient.insightController.getWeather({ feedtype: 'xml' });
    expect(res.status()).toBe(200);

    const text = await res.text();
    const expectedMessage =
      'Message: This page was not found. If you feel that you\'ve came to an error, please contact us at: Please contact us at mars.nasa.gov/feedback (404)';
    expect(text).toContain('<rssInfo>');
    expect(text).toContain(expectedMessage);
  });
});
