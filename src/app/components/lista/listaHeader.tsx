import React from "react";
import style from "./style.module.scss";
import { typeOrderBy } from "@/app/type/type";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

function dataOrder(
  // Funzione che setta l'ordinamento della lista
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

function FrecceListaOrdinamento({
  direction,
  by,
  ordinamento,
}: {
  direction: string | undefined;
  by: string | undefined | null;
  ordinamento: string;
}) {
  if (by !== ordinamento) {
    return null;
  }
  return (
    <div className={style.FrecceListaOrdinamento}>
      {direction && direction === "asc" ? (
        <div className={style.FrecceListaOrdinamento__freccia}>
          <MdArrowDropUp />
        </div>
      ) : (
        <div className={style.FrecceListaOrdinamento__freccia}>
          <MdArrowDropDown />
        </div>
      )}
    </div>
  );
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
        <span>Commessa</span>
        <FrecceListaOrdinamento
          direction={orderBy?.direction}
          by={orderBy?.orderBy}
          ordinamento={"codice"}
        />
      </div>
      <div onClick={() => dataOrder("sede_operativa", orderBy, setOrderBy)}>
        <span>Sede </span>
        <FrecceListaOrdinamento
          direction={orderBy?.direction}
          by={orderBy?.orderBy}
          ordinamento={"sede_operativa"}
        />
      </div>
      <div onClick={() => dataOrder("data_documento", orderBy, setOrderBy)}>
        <span>Data documento </span>
        <FrecceListaOrdinamento
          direction={orderBy?.direction}
          by={orderBy?.orderBy}
          ordinamento={"data_documento"}
        />
      </div>
      <div
        onClick={() => dataOrder("stato", orderBy, setOrderBy)}
        className={style.lista__listaItem__header__stato}
      >
        <span>Stato </span>
        <FrecceListaOrdinamento
          direction={orderBy?.direction}
          by={orderBy?.orderBy}
          ordinamento={"stato"}
        />
      </div>
    </li>
  );
}

export default ListaHeader;
