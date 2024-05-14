import React from "react";
import style from "./style.module.scss";
function ListaHeader({
  orderBy,
  setOrderBy,
}: {
  orderBy: string | null;
  setOrderBy: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return (
    <li
      className={`${style.lista__listaItem} ${style.lista__listaItem__header}`}
    >
      <div onClick={() => setOrderBy("codice")}>Commessa</div>
      <div onClick={() => setOrderBy("sede_operativa")}>Sede</div>
      <div onClick={() => setOrderBy("data_documento")}>Data documento</div>
      <div
        onClick={() => setOrderBy("stato")}
        className={style.lista__listaItem__header__stato}
      >
        Stato
      </div>
    </li>
  );
}

export default ListaHeader;
