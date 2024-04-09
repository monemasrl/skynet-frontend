"use client";

import { ContextProvider } from "./context/context";
import Login from "./components/login/login";
import { Suspense } from "react";
import style from "./page.module.scss";

export default function LoginPage() {
  return (
    <Suspense>
      <ContextProvider>
        <main className={style.login}>
          <Login />
        </main>
      </ContextProvider>
    </Suspense>
  );
}
