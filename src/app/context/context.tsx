"use client";
import { createContext, useEffect, useState } from "react";
import { OrderType, SkynetApiClient } from "../../generated";
import { useAuth } from "react-oidc-context";
import { type tContext } from "../type/type";

const context = createContext<tContext | null>(null);

function ContextProvider({ children }: { children: React.ReactNode }): any {
  /*   const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter(); */
  const [filtro, setFiltro] = useState<string | undefined>("");
  const [ricerca, setRicerca] = useState<string>("");
  const [commessa, setCommessa] = useState<OrderType | null | undefined>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [apiClient, setApiClient] = useState<SkynetApiClient | undefined>(
    undefined
  );
  const [isCommessaSelectedByList, setIsCommessaSelectedByList] =
    useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);

  console.log(refreshData, "refreshData");
  const auth = useAuth();
  useEffect(() => {
    if (auth?.user?.access_token) {
      //setta al caricamento della pagina l'apiClient con il token dell'utente
      setApiClient(
        new SkynetApiClient({
          TOKEN: auth?.user?.access_token,
          BASE: process.env.NEXT_PUBLIC_BACKEND_URL,
        })
      );
      // aggiorna l'apiClient ogni 10 minuti
      let dataInterval = setInterval(() => {
        setApiClient(
          new SkynetApiClient({
            TOKEN: auth?.user?.access_token,
            BASE: process.env.NEXT_PUBLIC_BACKEND_URL,
          })
        );
      }, 300000);

      return () => {
        clearInterval(dataInterval);
      };
    }
  }, [auth]);

  const value: tContext = {
    filtro,
    setFiltro,
    commessa,
    setCommessa,
    ricerca,
    setRicerca,
    currentPage,
    setCurrentPage,
    setIsArchived,
    isArchived,
    apiClient,
    isCommessaSelectedByList,
    setIsCommessaSelectedByList,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
}

export { ContextProvider, context };
