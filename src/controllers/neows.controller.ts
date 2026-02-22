import { BaseController } from './base.controller';

/**
 * Asteroids - NeoWs (Near Earth Object Web Service)
 * @see https://api.nasa.gov/
 * - Neo - Feed: GET /neo/rest/v1/feed
 * - Neo - Browse: GET /neo/rest/v1/neo/browse
 * - Neo - Lookup: GET /neo/rest/v1/neo/{asteroid_id}
 */
export class NeoWsController extends BaseController {
  /**
   * Retrieve a list of Asteroids based on their closest approach date to Earth.
   * @param startDate - YYYY-MM-DD
   * @param endDate - YYYY-MM-DD (optional; default 7 days after start_date, max range 7 days)
   */
  async getFeed(params: {
    apiKey?: string;
    startDate: string;
    endDate?: string;
  }) {
    const { apiKey, startDate, endDate } = params;

    const urlParams = new URLSearchParams({
      api_key: apiKey ?? this.apiKey,
      start_date: startDate,
    });
    if (endDate) urlParams.set('end_date', endDate);

    return this.request.get(`/neo/rest/v1/feed?${urlParams.toString()}`);
  }

  /**
   * Browse the overall Asteroid data-set (paginated).
   * @param params.apiKey - Optional override
   * @param params.page - Page number (optional)
   * @param params.size - Page size (optional)
   */
  async getBrowse(params: {
    apiKey?: string;
    page?: number;
    size?: number;
  } = {}) {
    const { apiKey, page, size } = params;

    const urlParams = new URLSearchParams({
      api_key: apiKey ?? this.apiKey,
    });
    if (page !== undefined) urlParams.set('page', String(page));
    if (size !== undefined) urlParams.set('size', String(size));

    return this.request.get(`/neo/rest/v1/neo/browse?${urlParams.toString()}`);
  }

  /**
   * Look up a specific Asteroid by its NASA JPL small body ID (SPK-ID).
   * @param params.asteroidId - NASA JPL small body identifier
   * @param params.apiKey - Optional override
   */
  async getLookup(params: { asteroidId: string; apiKey?: string }) {
    const { asteroidId, apiKey } = params;

    const urlParams = new URLSearchParams({
      api_key: apiKey ?? this.apiKey,
    });

    return this.request.get(
      `/neo/rest/v1/neo/${asteroidId}?${urlParams.toString()}`
    );
  }
}
