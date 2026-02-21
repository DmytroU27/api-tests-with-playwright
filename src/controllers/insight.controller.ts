import { BaseController } from './base.controller';

export class InsightController extends BaseController {
    
    async getWeather() {
        return this.request.get(
      `/insight_weather/?api_key=${this.apiKey}&feedtype=json&ver=1.0`
    );
    }
}