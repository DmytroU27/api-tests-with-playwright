import { APIRequestContext } from "@playwright/test";

export abstract class BaseController {
    constructor(protected apiKey: string, protected request: APIRequestContext) { }
}