// src/components/SessionGuard.tsx
"use client";
import { DefaultSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

interface Session extends DefaultSession {
  roles?: string[];
  error?: string;
}
export default function SessionGuard({ children }: { children: ReactNode }) {
  const { data } = useSession();
  useEffect(() => {
    if ((data as Session)?.error === "RefreshAccessTokenError") {
      signIn("keycloak");
    }
  }, [data]);

  return <>{children}</>;
}
