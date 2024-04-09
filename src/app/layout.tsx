import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Jost } from "next/font/google";
import SessionProvider from "./components/sessionProvider/sessionProvider";
import AuthProvider from "./components/sessionProvider/authProvider";
import SessionGuard from "./components/SessionGuard";
import "./sass/all.scss";

const jost = Jost({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "b2b Skynet",
  description: "Generated by Monema srl",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  const oidcConfig = {
    authority: "https://auth.service.monema.dev",
    client_id: "skynet",
    redirect_uri: process.env.REDIRECT_URI,
    scope: "openid profile email microprofile-jwt",
    metadataUrl:
      "https://auth.service.monema.dev/realms/skynet/.well-known/openid-configuration",
    // ...
  };
  return (
    <html lang="en">
      <body className={jost.className}>
        <SessionProvider session={session} refetchInterval={4 * 60}>
          <SessionGuard>
            <AuthProvider {...oidcConfig}>
              <div className="mainWrapper">
                {children}
                <footer className="mainFooter">powered by Skynet</footer>
              </div>
            </AuthProvider>
          </SessionGuard>
        </SessionProvider>
      </body>
    </html>
  );
}
