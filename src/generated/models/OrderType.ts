/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarrierTypeEnum } from './CarrierTypeEnum';
import type { ConsegnaEnum } from './ConsegnaEnum';
import type { Job } from './Job';
import type { StatusEnum } from './StatusEnum';
export type OrderType = {
    customer_id: string;
    customer_name: string;
    brand_code: (string | null);
    address: (string | null);
    code: string;
    sub_code: string;
    data_consegna: (string | null);
    data_documento: string;
    modalita_consegna: (ConsegnaEnum | null);
    carrier_type: (CarrierTypeEnum | null);
    carrier_name: (string | null);
    tracking_number: (string | null);
    external_production: boolean;
    ddt: (string | null);
    sotto_commessa_descrizione: string;
    status: StatusEnum;
    jobs: Array<Job>;
};

