import React from "react";
import style from "./style.module.scss";
function ListaHeader() {
  return (
    <li
      className={`${style.lista__listaItem} ${style.lista__listaItem__header}`}
    >
      <div>Commessa</div>
      <div>Sede</div>
      <div>Data documento</div>
      <div className={style.lista__listaItem__header__stato}>Stato</div>
    </li>
  );
}

export default ListaHeader;
