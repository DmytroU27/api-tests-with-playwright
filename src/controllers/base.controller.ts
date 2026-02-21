import { APIRequestContext } from "@playwright/test";

export class BaseController {
    constructor(protected apiKey: string, protected request: APIRequestContext) { }
}