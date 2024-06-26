"use client";
import { WebStorageStateStore } from "oidc-client-ts";
import { AuthProvider } from "react-oidc-context";
import { useState, useEffect } from "react";

const AuthProviderHoc = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isWindow, setIsWindow] = useState(false);
  const [oidcConfig, setOidcConfig] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsWindow(true);
    }
    setOidcConfig({
      authority: process.env.NEXT_PUBLIC_BACKEND_URL,
      client_id: "skynet",
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      scope: "openid profile email microprofile-jwt",
      metadataUrl: process.env.NEXT_PUBLIC_METADATA_URL,
      post_logout_redirect_uri:
        process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    });
  }, []);

  if (isWindow) {
    return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
  }
};

export default AuthProviderHoc;
