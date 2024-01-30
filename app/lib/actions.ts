'use server';

import { auth, signIn } from '@/auth';
import { Session, AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import bcrypt from 'bcrypt';

const scheduleSchema = z.object({
    date: z.string(),
    time: z.string(),
    length: z.coerce.number().gt(0, 'Please enter a number greater than 0'),
    comments: z.string(),
});
const signUpSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string()
});

export async function getSchedules(user: Session['user'] | undefined) {
    try {
        if (user?.status == 'administrator') {
            const schedules = await sql`SELECT schedule_id, name, date_time, length, comments FROM schedules INNER JOIN users ON schedules.user_id = users.user_id;`;
            return schedules.rows;
        } else {
            const schedules = await sql`SELECT schedule_id, date_time, length, comments FROM schedules INNER JOIN users ON schedules.user_id = users.user_id WHERE email = ${user?.email};`;
            return schedules.rows;
        }
    } catch (error) {
        throw new Error('Failed to fetch schedule data.');
    }
}

export async function addSchedules(prevState: string | undefined, formData: FormData) {
    try {
        const session = await auth();
        const validatedFields = scheduleSchema.safeParse({
            date: formData.get('date'),
            time: formData.get('time'),
            length: formData.get('length'),
            comments: formData.get('comments')
        });

        if (validatedFields.success) {
            const { date, time, length, comments } = validatedFields.data;
            try {
                await sql`INSERT INTO schedules (user_id, date_time, length, comments)
                VALUES ((SELECT user_id FROM users WHERE email = ${session?.user.email}), ${`${date} ${time}`}, ${length}, ${comments});`;
            } catch (error) {
                return 'Database error: Failed to add schedule.';
            }
        } else {
            return 'Invalid entries. Failed to add schedule.';
        }
    } catch (error) {
        return 'User session not detected. Try relogging in.';
    }
    
    revalidatePath('/schedules');
    redirect('/schedules');
}

export async function updateSchedule(prevState: string | undefined, scheduleID: string, formData: FormData) {
    const validatedFields = scheduleSchema.safeParse({
        date: formData.get('date'),
        time: formData.get('time'),
        length: formData.get('length'),
        comments: formData.get('comments')
    });

    if (validatedFields.success) {
        const { date, time, length, comments } = validatedFields.data;
        try {
            await sql`UPDATE schedules SET date_time = ${`${date} ${time}`}, length = ${length}, comments = ${comments} WHERE schedule_id = ${scheduleID};`;
        } catch (error) {
            return 'Database error: Failed to update schedule.';
        }
    } else {
        return 'Invalid entries. Failed to update schedule.';
    }

    revalidatePath('/schedules');
}

export async function deleteSchedule(scheduleID: string) {
    try {
        await sql`DELETE FROM schedules WHERE schedule_id = ${scheduleID};`;
    } catch (error) {
        return 'Database error: Falied to delete schedule.';
    }

    revalidatePath('/schedules');
}

export async function signUp(prevState: string | undefined, formData: FormData) {
    const validatedFields = signUpSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    });

    if (validatedFields.success) {
        const { name, email, password, confirmPassword } = validatedFields.data;
        if (password == confirmPassword) {
            const hashedPassword = await bcrypt.hash(password, 10);

            try {
                await sql`INSERT INTO users(name, email, password, status, date) 
            VALUES(${name}, ${email}, ${hashedPassword}, ${'member'}, ${(new Date).toISOString().split('T')[0]});`;
            } catch (error) {
                return 'Database error. Failed to add user.';
            }
            return 'Successful signup';
        } else {
            return 'Passwords do not match.';
        }
    } else {
        return 'Invalid Fields';
    }
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
    redirect('/schedules')
}

export async function sendContactForm(prevState: string | undefined, formData: FormData) {
    try {
        const formValues: { [key: string]: any } = {};
        formData.forEach((value, key) => {
            formValues[key] = value;
        });
        
        const headersList = headers();
        const domain = headersList.get('host') || '';
        const protocol = headersList.get('x-forwarded-proto') || '';
        await fetch(`${protocol}://${domain}/api/contact`, {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application.json'
            }
        });
    } catch (error) {
        return 'Something went wrong. Could not send contact form.';
    }
}
