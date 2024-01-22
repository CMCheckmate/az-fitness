import type { NextAuthConfig } from 'next-auth';
import { sql } from '@vercel/postgres';

export const authConfig = {
    pages: { signIn: '/login' },
    callbacks: {
        async session({ session }) {
            const userStatus = await sql`SELECT status FROM users WHERE email=${session.user.email}`;
            const status = userStatus.rows[0].status;
            session.user.status = status;
            return session;
        }, 
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
