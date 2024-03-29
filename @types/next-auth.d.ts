import { DefaultSession } from 'next-auth';
import { z } from 'zod';

const StatusEnum = z.enum(['Member', 'Administrator']);

declare module 'next-auth' {
    interface Session {
        user: {
            status?: z.infer<typeof StatusEnum> | null;
        } & DefaultSession['user'];
    }
}
