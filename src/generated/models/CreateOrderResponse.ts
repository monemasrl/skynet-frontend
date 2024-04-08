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
    data_completamento: (string | null);
    modalita_consegna: (string | null);
    carrier_type: (string | null);
    carrier_name: (string | null);
    tracking_number: (string | null);
    external_production?: boolean;
    external_supplier_code: (string | null);
    external_supplier_name: (string | null);
    is_milling?: boolean;
    fusman?: number;
    ddt: (string | null);
    sotto_commessa_descrizione: (string | null);
    jobs: string;
    status: (string | null);
    updated_at?: string;
    created_at?: string;
};

