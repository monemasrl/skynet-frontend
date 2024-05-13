/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Main Route
     * @returns any Successful Response
     * @throws ApiError
     */
    public mainRouteGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Health
     * @returns any Successful Response
     * @throws ApiError
     */
    public healthHealthGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/health',
        });
    }
    /**
     * Version
     * @returns any Successful Response
     * @throws ApiError
     */
    public versionVersionGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/version',
        });
    }
    /**
     * Info
     * @returns any Successful Response
     * @throws ApiError
     */
    public infoInfoGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/info',
        });
    }
    /**
     * Exception
     * @returns any Successful Response
     * @throws ApiError
     */
    public exceptionExceptionGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/exception',
        });
    }
}
