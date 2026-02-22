import { BaseController } from './base.controller';

export class InsightController extends BaseController {

    async getWeather(params: { apiKey?: string, feedtype?: string } = {}) {
        const { apiKey, feedtype } = params;

        const urlParams = new URLSearchParams({
            api_key: apiKey ?? this.apiKey,
            feedtype: feedtype ?? 'json',
            ver: '1.0',
        });

        return this.request.get(`/insight_weather/?${urlParams.toString()}`);
    }
}