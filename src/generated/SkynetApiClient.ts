/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';
import { CompaniesService } from './services/CompaniesService';
import { DefaultService } from './services/DefaultService';
import { OrdersService } from './services/OrdersService';
import { StatsService } from './services/StatsService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class SkynetApiClient {
    public readonly companies: CompaniesService;
    public readonly default: DefaultService;
    public readonly orders: OrdersService;
    public readonly stats: StatsService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '0.0.1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.companies = new CompaniesService(this.request);
        this.default = new DefaultService(this.request);
        this.orders = new OrdersService(this.request);
        this.stats = new StatsService(this.request);
    }
}

