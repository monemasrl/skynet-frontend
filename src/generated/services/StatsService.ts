/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetCountersResponse } from '../models/GetCountersResponse';
import type { GetGraphResponse } from '../models/GetGraphResponse';
import type { GraphScaleEnum } from '../models/GraphScaleEnum';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StatsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Counters
     * @returns GetCountersResponse Successful Response
     * @throws ApiError
     */
    public getCounters({
        pDate,
    }: {
        pDate?: (string | null),
    }): CancelablePromise<GetCountersResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/counters',
            query: {
                'p_date': pDate,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Sales
     * @returns GetGraphResponse Successful Response
     * @throws ApiError
     */
    public getSales({
        type,
    }: {
        type?: (GraphScaleEnum | null),
    }): CancelablePromise<GetGraphResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/sales',
            query: {
                'type': type,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Production
     * @returns GetGraphResponse Successful Response
     * @throws ApiError
     */
    public getProduction({
        type,
    }: {
        type?: (GraphScaleEnum | null),
    }): CancelablePromise<GetGraphResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/production',
            query: {
                'type': type,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }
}
