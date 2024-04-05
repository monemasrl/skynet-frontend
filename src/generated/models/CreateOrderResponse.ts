/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateOrderResponse = {
    customer_id: string;
    customer_name: string;
    brand_code: (string | null);
    address: (string | null);
    code: (string | null);
    sub_code: (string | null);
    data_consegna: (string | null);
    data_documento: string;
    modalita_consegna: (string | null);
    corriere: (string | null);
    tracking_number: (string | null);
    external_production?: boolean;
    ddt: (string | null);
    sotto_commessa_descrizione: (string | null);
    jobs: string;
    status: (string | null);
    created_at?: string;
};

