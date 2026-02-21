import { getApiKey } from "@env";
import { APIRequestContext } from "@playwright/test";
import { InsightController } from "@controllers/insight.controller";

export class ApiClient {

    private apiKey: string;

    public insightController: InsightController;

    constructor(private request: APIRequestContext) {
        this.apiKey = getApiKey();

        this.insightController = new InsightController(this.apiKey, this.request);
    }
}