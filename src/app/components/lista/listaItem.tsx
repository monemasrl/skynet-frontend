import { OrderType } from "@/generated";
import type { Dispatch, SetStateAction } from "react";
import DateObject from "react-date-object";
import { type cliente } from "../../type/type";
import StatoCommessa from "../stato/stato";
import style from "./style.module.scss";

function ListaItem({
  dataItem,
  currentListItem,
  setCurrentListItem,
  setIsOpenDrawer,
  isOpenDrawer,
  setIsCommessaSelectedByList,
}: {
  dataItem: OrderType;
  currentListItem: OrderType | null | undefined;
  setCurrentListItem:
    | Dispatch<SetStateAction<OrderType | null | undefined>>
    | undefined;
  setIsOpenDrawer: Dispatch<SetStateAction<boolean>> | undefined;
  isOpenDrawer: boolean;
  setIsCommessaSelectedByList: Dispatch<SetStateAction<boolean>> | undefined;
}) {
  const dataLine: cliente = {
    customer_id: dataItem.cliente_codice,
    customer_name: dataItem.cliente_nome,
    sub_code: dataItem.codice,
    cliente: dataItem.brand_codice || "",
    sede_operativa: dataItem.sede_operativa || "",
    data_documento: dataItem.data_documento || "",
    stato: dataItem.stato,
    code: dataItem.id,
  };

  const dataCommessa: DateObject = new DateObject(dataLine.data_documento);

  return (
    dataLine && (
      <li
        key={dataLine.code}
        className={`${style.lista__listaItem} ${
          currentListItem?.id === dataLine.code
            ? style.lista__listaItem__active
            : ""
        }`}
        onClick={() => {
          setCurrentListItem && setCurrentListItem(dataItem);
          setIsCommessaSelectedByList && setIsCommessaSelectedByList(true);
          setIsOpenDrawer && setIsOpenDrawer(true);
        }}
      >
        <div style={{ wordBreak: "break-all" }}>{dataLine.sub_code}</div>
        <div>{dataLine.customer_name}</div>
        <div>{dataCommessa.format("DD/MM/YYYY")}</div>
        <StatoCommessa stato={dataLine.stato} tipo={"lista"} />
      </li>
    )
  );
}
export default ListaItem;
