import React from "react";
import style from "./style.module.scss";
import DataOrder from "./dataOrder";

function ListaHeader({
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
}: {
  orderBy: string | null;
  setOrderBy: React.Dispatch<React.SetStateAction<string | null>>;
  orderDirection: string;
  setOrderDirection: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <li
      className={`${style.lista__listaItem} ${style.lista__listaItem__header}`}
    >
      <div onClick={() => setOrderBy("codice")}>
        <span>Commessa </span>
      </div>
      <div onClick={() => setOrderBy("sede_operativa")}>
        <span>Sede </span>
      </div>
      <div onClick={() => setOrderBy("data_documento")}>
        <span>Data documento </span>
      </div>
      <div
        onClick={() => setOrderBy("stato")}
        className={style.lista__listaItem__header__stato}
      >
        <span>Stato </span>
      </div>
    </li>
  );
}

export default ListaHeader;
