/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Job } from './Job';
import type { StatusEnum } from './StatusEnum';
export type OrderType = {
    cliente_codice: string;
    cliente_nome: string;
    brand_codice: (string | null);
    sede_operativa: (string | null);
    codice: string;
    data_consegna: (string | null);
    data_consegna_prevista: (string | null);
    data_documento: string;
    modalita_consegna: (string | null);
    tracking_number: (string | null);
    ddt: (string | null);
    descrizione: string;
    stato: StatusEnum;
    jobs: Array<Job>;
};

