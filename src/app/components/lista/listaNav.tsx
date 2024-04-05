"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Ricerca from "../ricerca/ricerca";
import Select from "../select/select";
import style from "./style.module.scss";
import { HiLibrary } from "react-icons/hi";
import { motion } from "framer-motion";

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
  filtro,
  setFiltro,
  ricerca,
  setRicerca,
  setCurrentPage,
  isArchived,
  setIsArchived,
}: {
  filtro: string | null | undefined;
  setFiltro: Dispatch<SetStateAction<string | undefined>> | undefined;
  ricerca: string | undefined;
  setRicerca: Dispatch<SetStateAction<string | undefined>> | undefined;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  isArchived?: boolean;
  setIsArchived?: Dispatch<SetStateAction<boolean>>;
}) {
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
    </section>
  );
}
export default ListaNav;
