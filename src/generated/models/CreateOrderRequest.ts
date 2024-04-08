/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateOrderRequest = {
    id: number;
    affidamento_data_consegna: (string | null);
    affidamento_data_restituzione: (string | null);
    affidamento_esterno_id: (number | null);
    corriere_interno: (string | null);
    corriere_esterno: (string | null);
    tracking_number: (string | null);
    sede_operativa: string;
    sotto_commessa_c: string;
    sotto_commessa_d: string;
    cliente_codice: string;
    cliente_descrizione: string;
    cliente_id: number;
    cliente_sede_operativa: (string | null);
    data_consegna: (string | null);
    data_documento: string;
    data_lavorazione: (string | null);
    data_passaggio_consegna: (string | null);
    ddt: (string | null);
    fornitore_codice: (string | null);
    fornitore_descrizione: (string | null);
    griffe: (string | null);
    log_id: number;
    log_stato: string;
    log_updated_at: string;
    is_edited: number;
    materiale_magazzino: number;
    note: (string | null);
    stato: string;
    fusman?: number;
    dd11_20_x10_x40_d?: number;
    dima?: number;
    ffr?: number;
    plex?: number;
    plexs?: number;
    reggette?: number;
    sam?: number;
    'd': number;
    timbri?: number;
    armonici?: number;
    b464?: number;
};

