/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderRequest } from '../models/CreateOrderRequest';
import type { CreateOrderResponse } from '../models/CreateOrderResponse';
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
        status,
        archived,
        q,
    }: {
        page?: number,
        size?: number,
        status?: (string | null),
        archived?: (boolean | null),
        q?: (string | null),
    }): CancelablePromise<GetOrdersResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/orders/',
            query: {
                'page': page,
                'size': size,
                'status': status,
                'archived': archived,
                'q': q,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Order
     * @returns CreateOrderResponse Successful Response
     * @throws ApiError
     */
    public createOrder({
        requestBody,
    }: {
        requestBody: CreateOrderRequest,
    }): CancelablePromise<CreateOrderResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/orders/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }
}
