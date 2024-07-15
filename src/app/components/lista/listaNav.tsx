"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Ricerca from "../ricerca/ricerca";
import Select from "../select/select";
import style from "./style.module.scss";
import { HiLibrary } from "react-icons/hi";
import { motion } from "framer-motion";
import { CiSquareChevRight } from "react-icons/ci";
import { VscRefresh } from "react-icons/vsc";

function Switcher({
  isArchived,
  setIsArchive,
  setCurrentPage,
}: {
  isArchived?: boolean;
  setIsArchive?: Dispatch<SetStateAction<boolean>>;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
}) {
  const toggleSwitch = () => {
    setIsArchive && setIsArchive((prev) => !prev);
    setCurrentPage && setCurrentPage(1);
  };

  return (
    <div className={style.boxSwitch}>
      <span>Archivio: </span>
      <div
        className={style.switch}
        data-ison={isArchived}
        onClick={toggleSwitch}
      >
        <motion.div
          className={style.handle}
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        >
          <HiLibrary />
        </motion.div>
      </div>
    </div>
  );
}

function ListaNav({
  setFiltro,
  setCurrentPage,
  isArchived,
  setIsArchived,
  size,
  setSize,
  ricerca,
  filtro,
  setRicerca,
}: {
  filtro: string | null | undefined;
  setFiltro: Dispatch<SetStateAction<string | undefined>> | undefined;
  ricerca?: string;
  setRicerca?: Dispatch<SetStateAction<string | undefined>>;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  isArchived?: boolean;
  setIsArchived?: Dispatch<SetStateAction<boolean>>;
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
  orderDirection?: string;
}) {
  // variabile di stato per il debounce della fetch dei dati in base alla grandezza della pagina.
  const [getSize, setGetSize] = useState<number>(size);

  function resetFilters() {
    setFiltro && setFiltro("");
    setCurrentPage && setCurrentPage(1);
    setRicerca && setRicerca("");
    setIsArchived && setIsArchived(false);
    setSize(10);
    setGetSize(10);
  }
  return (
    <section className={style.listaNav}>
      <header>
        <h1>COMMESSE</h1>
        <div className={style.wrapperUi}>
          <Switcher
            isArchived={isArchived}
            setIsArchive={setIsArchived}
            setCurrentPage={setCurrentPage}
          />
          <button className={style.resetBtn} onClick={resetFilters}>
            <VscRefresh style={{ fontSize: "1.3rem" }} />
          </button>
        </div>
      </header>

      <nav>
        <Select
          filtro={filtro}
          setCurrentPage={setCurrentPage}
          setFiltro={setFiltro}
        />
        <Ricerca
          ricerca={ricerca}
          setCurrentPage={setCurrentPage}
          setRicerca={setFiltro}
        />
      </nav>
      <div className={style.listaNav__parametriLista}>
        <div className={style.listaNav__size}>
          <span>N°</span>{" "}
          <input
            className={style.sizeInput}
            type="text"
            value={getSize}
            placeholder={size.toString()}
            onChange={(e) => setGetSize(Number(e.target.value))}
          />
          <button
            className={style.listaNav__button}
            onClick={() => setSize(getSize)}
          >
            {" "}
            <CiSquareChevRight />
          </button>
        </div>
      </div>
    </section>
  );
}
export default ListaNav;
