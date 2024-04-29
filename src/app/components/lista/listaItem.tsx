import style from "./style.module.scss";
import { type cliente } from "../../type/type";
import StatoCommessa from "../stato/stato";
import type { Dispatch, SetStateAction } from "react";
import { OrderType } from "@/generated";

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
    customer_id: dataItem.customer_id,
    customer_name: dataItem.customer_name,
    sub_code: dataItem.sub_code,
    cliente: dataItem.brand_code || "",
    sede_operativa: dataItem.address,
    data_documento: dataItem.data_documento || "",
    stato: dataItem.status,
    code: dataItem.code,
  };
  console.log(dataLine, "dataLine");
  return (
    dataLine && (
      <li
        className={`${style.lista__listaItem} ${
          currentListItem?.code === dataLine.code
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
