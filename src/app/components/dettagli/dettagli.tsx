import style from "./style.module.scss";
import StatoCommessa from "../stato/stato";
import { motion } from "framer-motion";
import { useContext } from "react";
import { context } from "../../context/context";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MEDIAQUERIES } from "@/app/utility/variabili";
import Loading from "../loading/loading";

function Dettagli() {
  const isLandscape = useMediaQuery(MEDIAQUERIES.landscape);
  const contextData = useContext(context);
  const data = contextData?.commessa;

  return contextData?.commessa ? (
    <div className={style.dettagli} key={data?.code}>
      <header>
        <div className={style.dettagli__boxtitle}>
          <motion.span
            initial={{ opacity: 0, y: !isLandscape ? -50 : 0 }}
            animate={{ opacity: 1, y: !isLandscape ? 0 : 0 }}
            transition={{ ease: "easeIn", duration: 0.5 }}
          >
            codice
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: !isLandscape ? -50 : 0 }}
            animate={{ opacity: 1, y: !isLandscape ? 0 : 0 }}
            transition={{ ease: "easeIn", duration: 0.5 }}
          >
            {data?.code}
          </motion.h2>
        </div>
        <StatoCommessa stato={data?.status} tipo="button" />
      </header>
      <main>
        <motion.section
          initial={{ opacity: 0, y: !isLandscape ? 30 : 0 }}
          animate={{ opacity: 1, y: !isLandscape ? 0 : 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <div className={style.dettagli__col1}>
            <div className={style.dettagli__dato}>
              <span>Cliente</span>
              {data?.customer_name}
            </div>
          </div>
          <div className={style.dettagli__col1}>
            <div className={style.dettagli__dato}>
              <span>Sede Operativa</span>
              {data?.address}
            </div>
          </div>
          <div className={style.dettagli__col2}>
            <div className={style.dettagli__dato}>
              <span>Descrizione Sotto Commessa</span>
              {data?.sotto_commessa_descrizione}
            </div>
          </div>
          <div className={style.dettagli__col1}>
            <div className={style.dettagli__dato}>
              <span>Data Consegna</span>
              {data?.data_consegna}
            </div>
          </div>
          <div className={style.dettagli__col1}>
            <div className={style.dettagli__dato}>
              <span>Data Documento</span>
              {data?.data_documento}
            </div>
          </div>
          <div className={style.dettagli__col1}>
            <div className={style.dettagli__dato}>
              <span>Modalità di consegna</span>
              {data?.modalita_consegna}
            </div>
          </div>
          <div className={style.dettagli__col1}>
            <div className={style.dettagli__dato}>
              <span>DDT</span>
              {data?.ddt}
            </div>
          </div>
          <div className={style.dettagli__col2}>
            <div className={style.dettagli__dato}>
              <span>Tracking Number</span>
              {data?.tracking_number}
            </div>
          </div>
        </motion.section>
        <motion.aside
          className={style.dettagli__jobs}
          initial={{ opacity: 0, y: !isLandscape ? 50 : 0 }}
          animate={{ opacity: 1, y: !isLandscape ? 0 : 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <ul>
            {data?.jobs.map((job, index) => {
              return (
                <li key={index}>
                  <div className={style.dettagli__jobs__title}>{job.name}</div>
                  <div className={style.dettagli__jobs__quantity}>
                    {job.quantity}
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.aside>
      </main>
    </div>
  ) : (
    <div className={style.dettagli}>
      <Loading />
    </div>
  );
}
export default Dettagli;
