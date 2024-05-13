/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetOrdersResponse } from '../models/GetOrdersResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OrdersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Order
     * @returns GetOrdersResponse Successful Response
     * @throws ApiError
     */
    public getOrder({
        code,
    }: {
        code: string,
    }): CancelablePromise<GetOrdersResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/orders/{code}',
            path: {
                'code': code,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * List Orders
     * @returns GetOrdersResponse Successful Response
     * @throws ApiError
     */
    public listOrders({
        page,
        size = 10,
        statuses,
        archived,
        q,
        orderBy,
        orderDirection,
    }: {
        page?: number,
        size?: number,
        statuses?: (string | null),
        archived?: (boolean | null),
        q?: (string | null),
        orderBy?: (string | null),
        orderDirection?: (string | null),
    }): CancelablePromise<GetOrdersResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/orders/',
            query: {
                'page': page,
                'size': size,
                'statuses': statuses,
                'archived': archived,
                'q': q,
                'order_by': orderBy,
                'order_direction': orderDirection,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }
}
