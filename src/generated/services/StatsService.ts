/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetFusmanResponse } from '../models/GetFusmanResponse';
import type { GetSalesResponse } from '../models/GetSalesResponse';
import type { SalesTypeEnum } from '../models/SalesTypeEnum';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StatsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Fusmans
     * @returns GetFusmanResponse Successful Response
     * @throws ApiError
     */
    public getFusmans({
        date,
    }: {
        date?: (string | null),
    }): CancelablePromise<GetFusmanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/stats/fusman',
            query: {
                'date': date,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Sales
     * @returns GetSalesResponse Successful Response
     * @throws ApiError
     */
    public getSales({
        type,
    }: {
        type?: (SalesTypeEnum | null),
    }): CancelablePromise<GetSalesResponse> {
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
}
