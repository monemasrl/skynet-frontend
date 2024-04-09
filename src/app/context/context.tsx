"use client";
import { type DefaultSession } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { OrderType, SkynetApiClient } from "../../generated";
import { useAuth } from "react-oidc-context";
import { type tContext } from "../type/type";

interface SessionExtension extends DefaultSession {
  access_token: string;
  apiToken: string;
  refreshToken: string;
}

const context = createContext<tContext | null>(null);

/**
 * Context applicazione
 * @date 20/03/2024 - 12:18:27
 * @description : FUNZIONAMENTO PAGINAZIONE E URL PARAMS
 * @var currentPage - 1 di default se non trova il parametro page
 * @function useEffect - al caricamento della app cerca i dati in base al parametro page e li setta in dati. *
 * Esegue la funzione handleSearchParamsUrl che setta i parametri di ricerca dell'url
 * La app viene aggiornata ogni volta che cambia currentPage (dipendenza di useEffect)
 *
 */

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

  const { data: sessionToken, status } = useSession() as {
    data: SessionExtension | null;
    status: string;
  };
  const auth = useAuth();
  useEffect(() => {
    if (auth?.user?.access_token) {
      setApiClient(
        new SkynetApiClient({
          TOKEN: auth?.user?.access_token,
          BASE: process.env.NEXT_PUBLIC_BACKEND_URL,
        })
      );
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
