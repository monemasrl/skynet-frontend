import React from "react";
import style from "./style.module.scss";
import { typeOrderBy } from "@/app/type/type";

function dataOrder(
  label: string,
  orderBy: typeOrderBy | null,
  setOrderBy: React.Dispatch<React.SetStateAction<typeOrderBy | null>>
) {
  if (orderBy?.orderBy === null) {
    setOrderBy({ orderBy: label, direction: "asc" });
  }
  if (orderBy?.orderBy === label) {
    if (orderBy.direction === "asc") {
      setOrderBy({ orderBy: label, direction: "desc" });
    } else {
      setOrderBy({ orderBy: label, direction: "asc" });
    }
  }
  if (orderBy?.orderBy !== label) {
    setOrderBy({ orderBy: label, direction: "asc" });
  }
}

function ListaHeader({
  orderBy,
  setOrderBy,
}: {
  orderBy: typeOrderBy | null;
  setOrderBy: React.Dispatch<React.SetStateAction<typeOrderBy | null>>;
}) {
  return (
    <li
      className={`${style.lista__listaItem} ${style.lista__listaItem__header}`}
    >
      <div onClick={() => dataOrder("codice", orderBy, setOrderBy)}>
        <span>Commessa </span>
      </div>
      <div onClick={() => dataOrder("sede_operativa", orderBy, setOrderBy)}>
        <span>Sede </span>
      </div>
      <div onClick={() => dataOrder("data_documento", orderBy, setOrderBy)}>
        <span>Data documento </span>
      </div>
      <div
        onClick={() => dataOrder("stato", orderBy, setOrderBy)}
        className={style.lista__listaItem__header__stato}
      >
        <span>Stato </span>
      </div>
    </li>
  );
}

export default ListaHeader;
