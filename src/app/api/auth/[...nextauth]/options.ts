import { NextAuthOptions, TokenSet } from "next-auth";

import { JWT } from "next-auth/jwt";
import KeyCloakProvider from "next-auth/providers/keycloak";

function requestRefreshOfAccessToken(token: JWT) {
    if (process.env.KEYCLOAK_ID === undefined || process.env.KEYCLOAK_SECRET === undefined || process.env.KEYCLOAK_ISSUER === undefined) {
        throw new Error("Missing environment variables");
    }
    return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            client_id: process.env.KEYCLOAK_ID,
            client_secret: process.env.KEYCLOAK_SECRET,
            refresh_token: token.refreshToken!,
        }),
        method: "POST",
        cache: "no-store"
    });
}
export const authOptions: NextAuthOptions = {
    session: {
        maxAge: 60 * 30,
    },
    providers: [
        KeyCloakProvider({
            clientId: process.env.KEYCLOAK_ID || "",
            clientSecret: process.env.KEYCLOAK_SECRET || "",
            issuer: process.env.KEYCLOAK_ISSUER,
            authorization: { params: { scope: 'openid profile email skynet microprofile-jwt' } },
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name ?? profile.preferred_username,
                    email: profile.email,
                    image: profile.picture,
                    groups: profile.groups,
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (account) {
                token = Object.assign({}, token, {
                    idToken: account.id_token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    expiresAt: account.expires_at,
                    access_token: account.access_token,
                });
            }
            if (profile) {
                token = Object.assign({}, token, {
                    groups: (profile as { groups: string[] }).groups,
                });
            }
            if (Date.now() < (token.expiresAt! * 1000 - 60 * 1000)) {
                return token;
            } else {
                try {
                    const response = await requestRefreshOfAccessToken(token);
                    const tokens: TokenSet = await response.json();

                    if (!response.ok) {
                        throw new Error("Failed to refresh token");
                    }

                    const updateToken: JWT = {
                        ...token,
                        idToken: tokens.id_token,
                        accessToken: tokens.access_token,
                        refreshToken: tokens.refresh_token,
                        expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number))
                    }
                    return updateToken;
                } catch (error) {
                    console.error("Error refreshing access token", error)
                    return { ...token, error: "RefreshAccessTokenError" }
                }

            }
        },
        async session({ session, token, user }) {
            if (session) {
                session = Object.assign({}, session, {
                    access_token: token.accessToken,
                    roles: token.groups,
                });
            }
            return session;
        },
    },
    theme: {
        colorScheme: "light", // "auto" | "dark" | "light"
        brandColor: "", // Hex color code
        logo: "", // Absolute URL to image
        buttonText: "" // Hex color code

    }
};