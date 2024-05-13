import { OrderType } from "@/generated";
import type { Dispatch, SetStateAction } from "react";
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
    sub_code: dataItem.cliente_codice,
    cliente: dataItem.brand_codice || "",
    sede_operativa: dataItem.sede_operativa || "",
    data_documento: dataItem.data_documento || "",
    stato: dataItem.stato,
    code: dataItem.codice,
  };
  console.log(dataLine, "dataLine");
  return (
    dataLine && (
      <li
        className={`${style.lista__listaItem} ${
          currentListItem?.codice === dataLine.code
            ? style.lista__listaItem__active
            : ""
        }`}
        onClick={() => {
          setCurrentListItem && setCurrentListItem(dataItem);
          setIsCommessaSelectedByList && setIsCommessaSelectedByList(true);
          setIsOpenDrawer && setIsOpenDrawer(true);
        }}
      >
        <div>{dataLine.sub_code}</div>
        <div>{dataLine.customer_name}</div>
        <div>{dataLine.data_documento}</div>
        <StatoCommessa stato={dataLine.stato} tipo={"lista"} />
      </li>
    )
  );
}
export default ListaItem;
