'use server';

import { auth, signIn } from '@/auth';
import { Session, AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const scheduleSchema = z.object({
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    address: z.string(),
    comments: z.string(),
});
const signUpSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string()
});

export async function getExcludedTimes(dateTime: { date: string, time: string } | null = null) {
    interface DateExclusions {
        [key: string]: { start: string, end: string }[]
    }

    try {
        const scheduleTimes = {} as DateExclusions;
        const schedules = dateTime ? await sql`SELECT TO_CHAR(date, 'YYYY-MM-DD') AS date, TO_CHAR(start_time, 'HH24:MI') AS start_time, TO_CHAR(end_time, 'HH24:MI') AS end_time FROM schedules WHERE date != ${dateTime.date} OR start_time != ${dateTime.time} ORDER BY date, start_time;` :
            await sql`SELECT TO_CHAR(date, 'YYYY-MM-DD') AS date, TO_CHAR(start_time, 'HH24:MI') AS start_time, TO_CHAR(end_time, 'HH24:MI') AS end_time FROM schedules ORDER BY date, start_time;`
        
        if (dateTime) {
            scheduleTimes[dateTime.date] = [];
        }
        for (const schedule of schedules.rows) {
            if (!scheduleTimes[schedule.date]) {
                scheduleTimes[schedule.date] = [];
            }
            scheduleTimes[schedule.date].push({ start: schedule.start_time, end: schedule.end_time });
        }
        return scheduleTimes;
    } catch (error) {
        return {};
    }
}

export async function getSchedules(user: Session['user'] | undefined) {
    try {
        const schedules = user?.status == 'administrator' ? await sql`SELECT schedule_id, name, TO_CHAR(date, 'YYYY-MM-DD') AS date, TO_CHAR(start_time, 'HH:MI AM') AS start_time, TO_CHAR(end_time, 'HH:MI AM') AS end_time, address, comments FROM schedules INNER JOIN users ON schedules.user_id = users.user_id;` :
            await sql`SELECT schedule_id, TO_CHAR(date, 'YYYY-MM-DD') AS date, TO_CHAR(start_time, 'HH:MI AM') AS start_time, TO_CHAR(end_time, 'HH:MI AM') AS end_time, address, comments FROM schedules INNER JOIN users ON schedules.user_id = users.user_id WHERE email = ${user?.email};`;

        return schedules.rows;
    } catch (error) {
        return [];
    }
}

async function validateSchedule(date: string, startTime: string, scheduleID: string | null = null) {
    try {
        const clashes = scheduleID ? await sql`SELECT * FROM schedules WHERE date = ${date} AND ${startTime} BETWEEN start_time AND end_time AND schedule_id != ${scheduleID};` : 
            await sql`SELECT * FROM schedules WHERE date = ${date} AND ${startTime} BETWEEN start_time AND end_time;`;
        
        if (clashes.rows.length == 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return error;
    }
}

export async function addSchedules(prevState: string | undefined, formData: FormData) {
    try {
        const session = await auth();
        const validatedFields = scheduleSchema.safeParse({
            date: formData.get('date'),
            startTime: formData.get('startTime'),
            endTime: formData.get('endTime'),
            address: formData.get('address'),
            comments: formData.get('comments')
        });

        if (validatedFields.success) {
            const { date, startTime, endTime, address, comments } = validatedFields.data;

            if (await validateSchedule(date, startTime)) {
                try {
                    await sql`INSERT INTO schedules (user_id, date, start_time, end_time, address, comments)
                VALUES ((SELECT user_id FROM users WHERE email = ${session?.user.email}), ${date}, ${startTime}, ${endTime}, ${address}, ${comments});`;
                } catch (error) {
                    return 'Database error. Failed to add schedule.';
                }
            } else {
                return 'Schedule clash detected. Failed to add schedule.';
            }
        } else {
            return 'Invalid entries. Failed to add schedule.';
        }
    } catch (error) {
        return 'User session not detected. Try relogging in.';
    }

    revalidatePath('/schedules');
}

export async function updateSchedule(prevState: string | undefined, scheduleID: string, formData: FormData) {
    const validatedFields = scheduleSchema.safeParse({
        date: formData.get('date'),
        startTime: formData.get('start_time'),
        endTime: formData.get('end_time'),
        address: formData.get('address'),
        comments: formData.get('comments')
    });

    if (validatedFields.success) {
        const { date, startTime, endTime, address, comments } = validatedFields.data;

        if (await validateSchedule(date, startTime, scheduleID)) {
            try {
                await sql`UPDATE schedules SET date = ${date}, start_time = ${startTime}, end_time = ${endTime}, address = ${address}, comments = ${comments} WHERE schedule_id = ${scheduleID};`;
            } catch (error) {
                return 'Database error: Failed to update schedule.';
            }
        } else {
            return 'Schedule clash detected. Failed to update schedule.';
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
                await sql`INSERT INTO users(name, email, password, status, signup_date) 
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

export async function sendEmailForm(prevState: string | undefined, formType: string, formData: FormData) {
    try {
        const headersList = headers();
        const domain = headersList.get('host') || '';
        const protocol = headersList.get('x-forwarded-proto') || '';
        const formValues: { [key: string]: any } = {};

        formData.forEach((value, key) => {
            formValues[key] = value;
        });
        formValues['formType'] = formType;

        const response = await fetch(`${protocol}://${domain}/api/contact`, {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application.json'
            }
        });

        if (response.ok) {
            return 'Message successfully sent.';
        } else {
            return 'Something went wrong. Could not send form.';
        }
    } catch (error) {
        return 'Something went wrong. Could not send form.';
    }
}
