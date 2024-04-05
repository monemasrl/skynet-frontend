import 'next-auth'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken?: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        idToken?: string
        refreshToken?: string
        accessToken?: string
        expiresAt?: number
    }
}

