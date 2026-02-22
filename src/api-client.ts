import { getApiKey } from "@env";
import { APIRequestContext } from "@playwright/test";
import { InsightController } from "@controllers/insight.controller";
import { NeoWsController } from "@controllers/neows.controller";

export class ApiClient {

    private apiKey: string;

    public insightController: InsightController;
    public neoController: NeoWsController;

    constructor(private request: APIRequestContext) {
        this.apiKey = getApiKey();

        this.insightController = new InsightController(this.apiKey, this.request);
        this.neoController = new NeoWsController(this.apiKey, this.request);
    }
}