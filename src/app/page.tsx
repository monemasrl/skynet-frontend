"use client";

import { ContextProvider } from "./context/context";
import Login from "./components/login/login";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import style from "./page.module.scss";

export default function LoginPage() {
  const { data: sessionToken, status } = useSession();
  if (sessionToken !== null) {
    redirect("/dashboard");
  }

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
