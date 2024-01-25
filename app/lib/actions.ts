'use server';

import { auth, signIn } from '@/auth';
import { Session, AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';

const data = [
    {
        'name': 'Sussy Baka',
        'date': '01/04/2024',
        'time': '6:00',
        'length': '1',
        'comments': '',
    },
    {
        'name': 'Mike Oxlong',
        'date': '06/06/2024',
        'time': '6:09',
        'length': '69',
        'comments': '69 baby!',
    },
    {
        'name': 'Ming Ray Goy',
        'date': '01/01/2024',
        'time': '14:00',
        'length': '0.5',
        'comments': 'Leg Day :T',
    }
];

const FormSchema = z.object({
    date: z.string(),
    time: z.string(),
    length: z.coerce
        .number()
        .gt(0, { message: 'Please enter session length greater than 0 hours.' }),
    comments: z.string(),
});

export async function getSchedules(user: Session['user'] | undefined) {
    try {
        if (user?.status == 'administrator') {
            const schedules = await sql`SELECT name, date_time, length, comments FROM schedules INNER JOIN users ON schedules.user_id = users.user_id`;
            return schedules.rows;
        } else {
            const schedules = await sql`SELECT date_time, length, comments FROM schedules INNER JOIN users ON schedules.user_id = users.user_id WHERE email = ${user?.email}`;
            return schedules.rows;
        }
    } catch (error) {
        throw new Error('Failed to fetch schedule data.');
    }
}

export async function addSchedules(prevState: string | undefined, formData: FormData) {
    try {
        const session = await auth();
        const validatedFields = FormSchema.safeParse({
            date: formData.get('date'),
            time: formData.get('time'),
            length: formData.get('length'),
            comments: formData.get('comments')
        });

        if (!validatedFields.success) {
            return 'Invalid entries. Failed to add schedule.';
        } else {
            const { date, time, length, comments } = validatedFields.data;
            try {
                await sql`INSERT INTO schedules (user_id, date_time, length, comments)
                VALUES ((SELECT user_id FROM users WHERE email = ${session?.user.email}), ${`${date} ${time}`}, ${length}, ${comments});`;
            } catch (error) {
                return 'Database error: Failed to add schedule.';
            }
        }
    } catch (error) {
        return 'User session not detected. Try relogging in.'
    }
    
    redirect('/schedules');
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
    }
    return 'Successful login';
}
