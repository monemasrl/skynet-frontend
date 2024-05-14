"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Ricerca from "../ricerca/ricerca";
import Select from "../select/select";
import style from "./style.module.scss";
import { HiLibrary } from "react-icons/hi";
import { motion } from "framer-motion";
import { CiSquareChevRight } from "react-icons/ci";
import DataOrder from "./dataOrder";

function Switcher({
  setIsArchive,
  setCurrentPage,
}: {
  setIsArchive?: Dispatch<SetStateAction<boolean>>;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
}) {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
    setIsArchive && setIsArchive((prev) => !prev);
    setCurrentPage && setCurrentPage(1);
  };

  return (
    <div className={style.boxSwitch}>
      <span>Archivio: </span>
      <div className={style.switch} data-ison={isOn} onClick={toggleSwitch}>
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
  orderBy,
  setIsArchived,
  size,
  setSize,
  setOrderDirection,
}: {
  filtro: string | null | undefined;
  setFiltro: Dispatch<SetStateAction<string | undefined>> | undefined;
  ricerca: string | undefined;
  setRicerca: Dispatch<SetStateAction<string | undefined>> | undefined;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  isArchived?: boolean;
  setIsArchived?: Dispatch<SetStateAction<boolean>>;
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
  orderDirection?: string;
  setOrderDirection?: Dispatch<SetStateAction<string>>;
  orderBy?: string | null;
}) {
  const [getSize, setGetSize] = useState<number>(size);

  return (
    <section className={style.listaNav}>
      <header>
        <h1>COMMESSE</h1>
        <Switcher
          setIsArchive={setIsArchived}
          setCurrentPage={setCurrentPage}
        />
      </header>

      <nav>
        <Select setCurrentPage={setCurrentPage} setFiltro={setFiltro} />
        <Ricerca setCurrentPage={setCurrentPage} setRicerca={setFiltro} />
      </nav>
      <div className={style.listaNav__parametriLista}>
        <div className={style.listaNav__size}>
          <span>N°</span>{" "}
          <input
            className={style.sizeInput}
            type="text"
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
        <DataOrder orderBy={orderBy} setOrderDirection={setOrderDirection} />
      </div>
    </section>
  );
}
export default ListaNav;
