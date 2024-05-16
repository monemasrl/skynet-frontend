import { SkynetApiClient, StatusEnum } from "@/generated";
import { Dispatch, SetStateAction } from "react";
import { OrderType } from "@/generated";

type cliente = {
    customer_id: string,
    customer_name: string,
    sub_code: string,
    cliente?: string,
    sede_operativa: string | null,
    data_documento: string,
    stato: StatusEnum | undefined
    code: number
}

type tColori = {
    id: string,
    nome: string,
    codice: string
}

type tDatiCommessa = {
    id: string,
    cliente: string,
    sede_operativa: string,
    data_consegna: string,
    data_documento: string,
    modalita_consegna: string,
    ddt: string,
    sotto_commessa: string,
    stato: string,
    hardware: {
        [ket: string]: number
    },
}
type tContext = {
    filtro?: string | undefined;
    setFiltro?: Dispatch<SetStateAction<string | undefined>>;
    commessa: OrderType | null | undefined;
    setCommessa: Dispatch<SetStateAction<OrderType | null | undefined>>;
    ricerca?: string;
    setRicerca: Dispatch<SetStateAction<string>> | undefined;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setIsArchived: Dispatch<SetStateAction<boolean>>;
    isArchived: boolean;
    apiClient: SkynetApiClient | undefined;
    isCommessaSelectedByList: boolean;
    setIsCommessaSelectedByList: Dispatch<SetStateAction<boolean>>;
    setRefreshData: Dispatch<SetStateAction<boolean>>;
};
type typeOrderBy = {
    orderBy: string | null;
    direction: string;
};

export type { cliente, tColori, tContext, tDatiCommessa, typeOrderBy };
