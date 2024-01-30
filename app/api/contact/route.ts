'use server'

import { NextResponse } from 'next/server';
import { mailOptions, transporter } from '@/app/components/nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        await transporter.sendMail({
            ...mailOptions,
            subject: data.subject,
            html: `
                <div>
                    <div style="margin: 10px; background-color: #f0f0f0; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);">
                        <h1 style="padding: 10px; text-align: center; font-size: 2.5em; color: #ffffff; font-weight: bold; background-color: #000000;">AZ-Fitness</h1>
                        <h2 style="padding-top: 10px; text-align: center; font-size: 1.5em; font-weight: bold;">Message Sent By:</h2>
                        <h2 style="text-align: center; font-size: 1em;">${data.name}</h2>
                        <h2 style="margin-bottom: 5px; text-align: center; font-size: 0.875em; font-style: italic;">${data.email}</h2>

                        <h2 style="margin-top: 10px; text-align: center; font-size: 1.5em; font-weight: bold;">Subject:</h2>
                        <h2 style="margin-bottom: 5px; text-align: center; font-size: 1em;">${data.subject}</h2>

                        <h2 style="margin-top: 10px; text-align: center; font-size: 1.5em; font-weight: bold;">Message:</h2>
                        <p style="padding-bottom: 10px; text-align: center; font-size: 1em;">${data.message}</p>
                    </div>
                </div>
            `
        });

        return NextResponse.json({ messsage: data });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Bad request' });
    }
}
