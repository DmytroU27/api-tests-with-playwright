import { BaseController } from './base.controller';

export class InsightController extends BaseController {

    async getWeather(params: {apiKey?: string, feedtype?: string} = {}) {
        const { apiKey, feedtype } = params;
        return this.request.get(
      `/insight_weather/?api_key=${apiKey ?? this.apiKey}&feedtype=${feedtype ?? 'json'}&ver=1.0`
    );
    }
}