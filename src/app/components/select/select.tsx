import { Company } from "@/generated";
import { AnimatePresence, motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import { useContext, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { type DefaultSession } from "next-auth";

interface SessionExtension extends DefaultSession {
  access_token: string;
  apiToken: string;
  refreshToken: string;
}
import { context } from "../../context/context";
import style from "./style.module.scss";

function Select({
  setFiltro,
  setCurrentPage,
}: {
  setFiltro: Dispatch<SetStateAction<string | undefined>> | undefined;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>("Azienda");
  const [dati, setDati] = useState<string[]>([]);
  const [cercaAziende, setCercaAziende] = useState<string | null>("");

  const contextData = useContext(context);

  useEffect(() => {
    /* Fetch dei dati */
    if (contextData?.apiClient) {
      contextData.apiClient.companies
        .listCompanies({
          q: cercaAziende && cercaAziende?.length > 0 ? cercaAziende : "",
          archived: contextData.isArchived,
        })
        .then((data) => {
          console.log(data, "cercaAziende");
          const aziende = data.companies.map((item: Company) => item.name);
          setDati(aziende);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData?.apiClient, cercaAziende, contextData?.isArchived]);

  return (
    <div
      className={style.select}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={style.select__header}>
        <span>{value}</span>
        <span className={style.select__header__icon}>
          <FaAngleDown />
        </span>
      </div>
      <AnimatePresence>
        {" "}
        {open && (
          <motion.ul
            className={style.select__list}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.1 } }}
          >
            <li className={style.select__list__search}>
              <input
                type="text"
                placeholder={"Cerca azienda"}
                onChange={(e) => {
                  setCercaAziende((e.target as HTMLInputElement).value);
                }}
              />
            </li>
            {dati?.map((azienda, index) => {
              return (
                setFiltro && (
                  <li
                    key={index}
                    onClick={() => {
                      setValue(azienda);
                      setFiltro(azienda || undefined);
                      setCurrentPage && setCurrentPage(1);
                      setOpen(false);
                    }}
                  >
                    {azienda}
                  </li>
                )
              );
            })}
            <li
              className={style.select__list__clear}
              onClick={() => {
                setValue("Azienda");
                setFiltro && setFiltro("");
                setOpen(false);
                setCercaAziende("");
              }}
            >
              Clear
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Select;
