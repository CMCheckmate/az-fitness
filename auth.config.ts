import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: { signIn: '/login' },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnSchedules = nextUrl.pathname.startsWith('/schedules');
            if (isOnSchedules && !isLoggedIn){
                return false; // Redirect unauthenticated users to login page
            } else {
                return true;
            }
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
