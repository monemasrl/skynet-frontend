"use client";
import ListaNav from "./listaNav";
import style from "./style.module.scss";
import { OrderType } from "@/generated";
import { type tContext } from "../../type/type";
import {
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { context } from "../../context/context";
import { MainError } from "../error/error";
import PaginatedItems from "../pagination/reactPagination";

/**
 * Componente Lista principale
 * @date 02/04/2024 - 11:18:20
 *
 * @param setErroreDatiFromMainFfetch
 * setta lo stato di errore dati sul parent se non ci sono dati da visualizzare nella lista
 * @param setIsOpenDrawer
 * setta lo stato di apertura del drawer
 * @param isOpenDrawer
 * stato di apertura del drawer
 */
function ListaAziende(dati: OrderType[] | null): (string | null)[] | null {
  if (dati) {
    const aziende = dati.map((item) => item.cliente_nome);
    return Array.from(new Set(aziende));
  }
  return null;
}
function MainListContainer({
  setIsOpenDrawer,
  isOpenDrawer,
}: {
  setIsOpenDrawer: Dispatch<SetStateAction<boolean>>;
  isOpenDrawer: boolean;
}) {
  const contextData: tContext | null = useContext(context);
  const ricerca = contextData?.filtro;
  const [orders, setOrders] = useState<OrderType[] | undefined>(undefined);
  const [erroreDati, setErroreDati] = useState<boolean>(false);
  const setRicerca: Dispatch<SetStateAction<string | undefined>> | undefined =
    contextData?.setFiltro;
  const [aziende, setAziende] = useState<(string | null)[] | null>(null);
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [orderDirection, setOrderDirection] = useState<string>("asc");
  const filtro = contextData?.filtro;
  const setFiltro: Dispatch<SetStateAction<string | undefined>> | undefined =
    contextData?.setFiltro;

  useEffect(() => {
    if (contextData?.apiClient) {
      contextData.apiClient.orders
        .listOrders({
          page: page - 1,
          size: size,
          q: filtro,
          archived: contextData?.isArchived,
          orderBy: orderBy,
          orderDirection: orderDirection,
        })
        .then((data) => {
          setOrders(data.orders);
          setAziende(ListaAziende(data.orders));
          setTotal(data.total);
          page === 1 &&
            !contextData?.isCommessaSelectedByList &&
            contextData.setCommessa(data.orders[0]);
        })
        .catch((error) => {
          console.log(error);
          setErroreDati(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    contextData?.apiClient,
    contextData?.isArchived,
    page,
    filtro,
    size,
    orderBy,
  ]);

  return erroreDati ? (
    <MainError />
  ) : (
    <div className={style.lista}>
      <ListaNav
        filtro={filtro}
        setFiltro={setFiltro}
        ricerca={ricerca}
        setRicerca={setRicerca}
        setCurrentPage={setPage}
        isArchived={contextData?.isArchived}
        setIsArchived={contextData?.setIsArchived}
        size={size}
        setSize={setSize}
      />
      <PaginatedItems
        itemsPerPage={size}
        datiTotale={total}
        dati={orders}
        setCurrentPage={setPage}
        currentListItem={contextData?.commessa}
        setCurrentListItem={contextData?.setCommessa}
        setIsOpenDrawer={setIsOpenDrawer}
        isOpenDrawer={isOpenDrawer}
        setIsCommessaSelectedByList={contextData?.setIsCommessaSelectedByList}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
    </div>
  );
}
export default MainListContainer;
