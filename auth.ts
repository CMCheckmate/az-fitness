import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export const { auth, signIn, signOut } = NextAuth({...authConfig, 
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);
                
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    
                    try {
                        const userData = await sql`SELECT * FROM users WHERE email=${email}`;
                        const user = userData.rows[0];
                        if (user) {
                            const passwordsMatch = await bcrypt.compare(password, user.password);
                            if (passwordsMatch) {
                                return user;
                            }
                        }
                    } catch (error) {
                        throw new Error('Failed to fetch user.');
                    }
                }
                return null; // Invalid credentials
            }
        })
    ],
});
