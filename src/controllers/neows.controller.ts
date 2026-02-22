import { BaseController } from './base.controller';

/**
 * Asteroids - NeoWs (Near Earth Object Web Service)
 * @see https://api.nasa.gov/ - Neo - Feed
 * GET /neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY
 */
export class NeoWsController extends BaseController {
  /**
   * Retrieve a list of Asteroids based on their closest approach date to Earth.
   * @param startDate - YYYY-MM-DD
   * @param endDate - YYYY-MM-DD (optional; default 7 days after start_date, max range 7 days)
   */
  async getFeed(params: { apiKey?: string, startDate: string, endDate?: string }) {
  const { apiKey, startDate, endDate } = params;

    const urlParams = new URLSearchParams({
      api_key: apiKey ?? this.apiKey,
      start_date: startDate,
    });
    if (endDate) urlParams.set('end_date', endDate);
    
    return this.request.get(`/neo/rest/v1/feed?${urlParams.toString()}`);
  }
}
