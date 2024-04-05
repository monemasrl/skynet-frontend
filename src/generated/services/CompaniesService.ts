/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetCompaniesResponse } from '../models/GetCompaniesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CompaniesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List Companies
     * @returns GetCompaniesResponse Successful Response
     * @throws ApiError
     */
    public listCompanies({
        q,
        archived,
    }: {
        q?: (string | null),
        archived?: (boolean | null),
    }): CancelablePromise<GetCompaniesResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/companies/',
            query: {
                'q': q,
                'archived': archived,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }
}
