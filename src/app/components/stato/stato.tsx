import { StatusEnum } from "@/generated";
import { motion } from "framer-motion";
import { COLORI } from "../../utility/variabili";
import style from "./style.module.scss";

type tDatiStato = {
  [key: string]: { stato: string | undefined; colore: string };
};

function coloreContrasto(colore: string) {
  if (colore === "lightBlue") return "#3b3b3b";
}

function StatoCommessa({
  stato,
  tipo,
}: {
  stato: StatusEnum | undefined;
  tipo: string;
}) {
  /**
   * Description placeholder
   * @date 15/03/2024 - 09:29:19
   *
   * @prop {tipo: string} "lista" o "button"
   *
   */

  const datiStato: tDatiStato = {
    annullata: {
      stato: "annullata",
      colore: "red",
    },
    lavorazione: {
      stato: "in lavorazione",
      colore: "orange",
    },

    presa_carico: {
      stato: "presa in carico",
      colore: "blue",
    },

    pronta: {
      stato: "pronta",
      colore: "green",
    },
    in_consegna: {
      stato: "in consegna",
      colore: "lightBlue",
    },
    archiviata: {
      stato: "archiviata",
      colore: "grey",
    },
  };

  if (tipo === "lista" && stato) {
    return (
      <div className={style.stato}>
        <span
          style={{ backgroundColor: stato && COLORI[datiStato[stato].colore] }}
        ></span>
        <span>{datiStato[stato].stato}</span>
      </div>
    );
  } else if (tipo === "button" && stato) {
    return (
      <motion.div
        className={style.statoBtn}
        style={{
          color: stato && coloreContrasto(datiStato[stato].colore),
          backgroundColor: stato && COLORI[datiStato[stato].colore],
        }}
        initial={{ width: "42px" }}
        animate={{ width: "100%" }}
        transition={{ delay: 1.3, duration: 0.5, ease: "easeOut" }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.3, ease: "easeIn" }}
        >
          {datiStato[stato].stato}
        </motion.span>
      </motion.div>
    );
  }
}
export default StatoCommessa;
