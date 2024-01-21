import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: { signIn: '/login' },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnSchedules = nextUrl.pathname.startsWith('/schedules');
            if (isOnSchedules) {
                if (!isLoggedIn) return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/schedules', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
