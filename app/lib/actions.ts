'use server';

import { auth, signIn, signOut } from '@/auth';
import { Session, AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { z } from 'zod';
import { load } from 'cheerio';
import axios from 'axios';
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
        const schedules = dateTime ? await sql`SELECT TO_CHAR(date, 'YYYY-MM-DD') AS date, TO_CHAR(starting_time, 'HH24:MI') AS start_time, TO_CHAR(ending_time, 'HH24:MI') AS end_time FROM schedules WHERE date != ${dateTime.date} OR starting_time != ${dateTime.time} ORDER BY date, starting_time;` :
            await sql`SELECT TO_CHAR(date, 'YYYY-MM-DD') AS date, TO_CHAR(starting_time, 'HH24:MI') AS start_time, TO_CHAR(ending_time, 'HH24:MI') AS end_time FROM schedules ORDER BY date, starting_time;`

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
        const schedules = user?.status == 'Administrator' ? await sql`SELECT schedule_id, name, TO_CHAR(date, 'YYYY-MM-DD') AS date, TO_CHAR(starting_time, 'HH:MI AM') AS start_time, TO_CHAR(ending_time, 'HH:MI AM') AS end_time, address, comments FROM schedules INNER JOIN users ON schedules.user_id = users.user_id WHERE date >= CURRENT_DATE ORDER BY name, date, starting_time;` :
            await sql`SELECT schedule_id, TO_CHAR(date, 'YYYY-MM-DD') AS date, TO_CHAR(starting_time, 'HH:MI AM') AS start_time, TO_CHAR(ending_time, 'HH:MI AM') AS end_time, address, comments FROM schedules INNER JOIN users ON schedules.user_id = users.user_id WHERE email = ${user?.email} AND date >= CURRENT_DATE ORDER BY date, starting_time;`;

        return schedules.rows;
    } catch (error) {
        return [];
    }
}

async function validateSchedule(date: string, startTime: string, scheduleID: string | null = null) {
    try {
        const clashes = scheduleID ? await sql`SELECT * FROM schedules WHERE date = ${date} AND ${startTime} BETWEEN starting_time AND ending_time AND schedule_id != ${scheduleID};` : 
            await sql`SELECT * FROM schedules WHERE date = ${date} AND ${startTime} BETWEEN starting_time AND ending_time;`;
        
        if (clashes.rows.length == 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return error;
    }
}

export async function addSchedules(formData: FormData) {
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
                    await sql`INSERT INTO schedules (user_id, date, starting_time, ending_time, address, comments)
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

export async function updateSchedule(scheduleID: string, formData: FormData) {
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
                await sql`UPDATE schedules SET date = ${date}, starting_time = ${startTime}, ending_time = ${endTime}, address = ${address}, comments = ${comments} WHERE schedule_id = ${scheduleID};`;
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

export async function signUp(formData: FormData) {
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
            VALUES(${name}, ${email}, ${hashedPassword}, ${'Member'}, ${(new Date).toISOString().split('T')[0]});`;
            } catch (error) {
                try {
                    const existingEmail = await sql`SELECT email FROM users WHERE email = ${email};`;
                    if (existingEmail.rows.length > 0) {
                        return 'Email already exists, try logging in.';
                    } else {
                        return 'Database error: Failed to add user.';
                    }
                } catch (error) {
                    return 'Database error: Failed to add user.';
                }
            }
            return 'Successful signup';
        } else {
            return 'Passwords do not match.';
        }
    } else {
        return 'Invalid Fields';
    }
}

export async function authenticate(formData: FormData) {
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
    redirect('/schedules');
}

export async function logOut() {
    await signOut();
    redirect('/');
}

export async function sendEmailForm(formType: string, formData: FormData) {
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

export async function scrapeWebsite(url: string) {
    interface Article {
        title: string;
        image: string;
        link: string;
        content: string;
    }

    const axiosInstance = axios.create();
    const articles = [] as Article[];

    try {
        const response = await axiosInstance.get(url, { responseType: 'arraybuffer' });
        const html = response.data;
        const $ = load(html);
        
        const articleData = $('article');
        articleData.each((index, element) => {
            if ($(element).attr('data-card-type') != 'premium') {
                articles.push({
                    title: $(element).find('h3').text(),
                    image: $(element).find('img').attr('data-srcset')?.split(' ')[0] || '../public/placeholder.png',
                    link: $(element).find('a').attr('href') || '',
                    content: $(element).find('p').text()
                });
            }
        });

        return articles;
    } catch (error) {
        return null;
    }
}
