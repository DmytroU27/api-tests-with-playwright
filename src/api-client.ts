import { getApiKey } from "@env";
import { APIRequestContext } from "@playwright/test";
import { InsightController } from "@controllers/insight.controller";
import { NeoWsController } from "@controllers/neows.controller";

export class ApiClient {

    public insightController: InsightController;
    public neoController: NeoWsController;

    constructor(private request: APIRequestContext) {
        const apiKey = getApiKey();

        this.insightController = new InsightController(apiKey, this.request);
        this.neoController = new NeoWsController(apiKey, this.request);
    }
}