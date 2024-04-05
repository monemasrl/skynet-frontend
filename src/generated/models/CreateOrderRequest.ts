/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateOrderRequest = {
    affidamento_data_consegna: (string | null);
    affidamento_data_restituzione: (string | null);
    affidamento_esterno_id: (number | null);
    armonici?: (number | null);
    b464?: (number | null);
    cliente_codice: string;
    cliente_descrizione: string;
    cliente_id: number;
    cliente_sede_operativa: (string | null);
    'd': number;
    data_consegna: (string | null);
    data_documento: string;
    data_lavorazione: (string | null);
    data_passaggio_consegna: (string | null);
    dd11_20_x10_x40_d?: (number | null);
    ddt: (string | null);
    dima?: (number | null);
    ffr?: (number | null);
    fornitore_codice: (string | null);
    fornitore_descrizione: (string | null);
    fusman?: (number | null);
    griffe: (string | null);
    log_id: number;
    log_stato: string;
    log_updated_at: string;
    id: number;
    is_edited: number;
    materiale_magazzino: number;
    note: (string | null);
    plex?: (number | null);
    plexs?: (number | null);
    reggette?: (number | null);
    sam?: (number | null);
    sede_operativa: string;
    sotto_commessa_c: string;
    sotto_commessa_d: string;
    stato: string;
    timbri?: (number | null);
};

