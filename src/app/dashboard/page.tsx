"use client";

import { MEDIAQUERIES } from "../utility/variabili";
import styles from "./style.module.scss";
import MainListContainer from "../components/lista/mainListContainer";
import Dettagli from "../components/dettagli/dettagli";
import { ContextProvider } from "../context/context";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "../components/drawer/drawer";
import Charts from "../components/charts/charts";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import NavBar from "../components/navbar/navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { DefaultSession } from "next-auth";

interface Session extends DefaultSession {
  roles?: string[];
}
export default function Home() {
  //const isPhone = useMediaQuery(MEDIAQUERIES.phone);
  const isLandscape = useMediaQuery(MEDIAQUERIES.landscape);
  const [drawerDettagli, setDrawerDettagli] = useState(false);
  const [drawerCharts, setDrawerCharts] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const { data: sessionToken, status } = useSession();
  console.log(sessionToken, "sessionToken");
  if (sessionToken === null) {
    redirect("/");
  }

  // Override console.error
  // This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
  // @link https://github.com/recharts/recharts/issues/3615
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  useEffect(() => {
    const checkIfManager = (sessionToken as Session)?.roles?.includes(
      "manager"
    );
    if (checkIfManager) {
      setUserRole("manager");
    }
  }, [sessionToken]);

  console.log(userRole, "userRole");
  return (
    <Suspense>
      <ContextProvider>
        <>
          <NavBar setDrawerCharts={setDrawerCharts} role={userRole} />
          <motion.div
            initial={{
              y: 10,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: "easeIn",
            }}
          >
            <Charts />{" "}
            {/*     {!isLandscape ? (
              <Charts />
            ) : (
              userRole === "manager" && (
                <Drawer
                  title="CHARTS"
                  setIsOpen={setDrawerCharts}
                  isOpen={drawerCharts}
                >
                  <Charts />
                </Drawer>
              )
            )}{" "} */}
          </motion.div>
          <motion.main
            className={styles.main}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              ease: "easeIn",
            }}
          >
            <section className={styles.main__lista}>
              <MainListContainer
                setIsOpenDrawer={setDrawerDettagli}
                isOpenDrawer={drawerDettagli}
              />
            </section>
            <section className={styles.main__dettagli}>
              {!isLandscape && <Dettagli />}
              {isLandscape && (
                <Drawer isOpen={drawerDettagli} setIsOpen={setDrawerDettagli}>
                  <Dettagli />
                </Drawer>
              )}
            </section>
          </motion.main>
        </>
      </ContextProvider>
    </Suspense>
  );
}
