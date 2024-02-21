'use server';

import { auth, signIn } from '@/auth';
import { Session, AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { z } from 'zod';
import { subHours, format } from 'date-fns';
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

export async function generateStartTimes(date: string, currentTime: string = '00:00', startHour: number = 6, endHour: number = 21) {
    const times = [];
    const time = new Date(0);
    time.setHours(startHour, 0);

    try {
        const schedules = await sql`SELECT start_time, end_time FROM schedules WHERE DATE(start_time) = ${date};`;
        while (time.getHours() < endHour || (time.getHours() == endHour && time.getMinutes() == 0)) {
            const initialTime = format(time, 'HH:mm');
            for (const schedule of schedules.rows) {
                if (initialTime >= format(subHours(schedule.start_time, 0.5), 'HH:mm') && initialTime <= format(schedule.end_time, 'HH:mm')) {
                    if (format(schedule.start_time, 'yyyy-MM-dd HH:mm') != format(`${date} ${currentTime}`, 'yyyy-MM-dd HH:mm')) {
                        time.setMinutes(time.getMinutes() + 30);
                        break;
                    }
                }
            }
            
            if (initialTime == format(time, 'HH:mm')) {
                times.push(format(time, 'hh:mm a'));
                time.setMinutes(time.getMinutes() + 30);
            }
        }

        return times;
    } catch(error) {
        return [];
    }
}

export async function getSchedules(user: Session['user'] | undefined) {
    try {
        if (user?.status == 'administrator') {
            const schedules = await sql`SELECT schedule_id, name, start_time, end_time, address, comments FROM schedules INNER JOIN users ON schedules.user_id = users.user_id;`;
            return schedules.rows;
        } else {
            const schedules = await sql`SELECT schedule_id, start_time, end_time, address, comments FROM schedules INNER JOIN users ON schedules.user_id = users.user_id WHERE email = ${user?.email};`;
            return schedules.rows;
        }
    } catch (error) {
        return [];
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

            try {
                await sql`INSERT INTO schedules (user_id, start_time, end_time, address, comments)
            VALUES ((SELECT user_id FROM users WHERE email = ${session?.user.email}), ${`${date} ${startTime}`}, ${`${date} ${endTime}`}, ${address}, ${comments});`;
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
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime'),
        address: formData.get('address'),
        comments: formData.get('comments')
    });

    if (validatedFields.success) {
        const { date, startTime, endTime, address, comments } = validatedFields.data;

        try {
            await sql`UPDATE schedules SET start_time = ${`${date} ${startTime}`}, end_time = ${`${date} ${endTime}`}, address = ${address}, comments = ${comments} WHERE schedule_id = ${scheduleID};`;
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

export async function sendEmailForm(prevState: string | undefined, formType: string, formData: FormData) {
    try {
        const formValues: { [key: string]: any } = {};
        formData.forEach((value, key) => {
            formValues[key] = value;
        });
        formValues['formType'] = formType;
        
        const headersList = headers();
        const domain = headersList.get('host') || '';
        const protocol = headersList.get('x-forwarded-proto') || '';
        console.log(`${protocol}://${domain}/api/contact`);
        
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
