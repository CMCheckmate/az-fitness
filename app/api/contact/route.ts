'use server'

import { NextResponse } from 'next/server';
import { mailOptions, transporter } from '@/app/components/nodemailer';
import ContactEmail from '@/app/components/contact-email';
import TestimonialEmail from '@/app/components/review-email';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        await transporter.sendMail({
            ...mailOptions,
            subject: data.formType == 'contact' ? `Contact - ${data.subject}` : 'Review',
            html: data.formType == 'contact' ? ContactEmail(data) : TestimonialEmail(data)
        });

        return NextResponse.json({ messsage: data });
    } catch (error) {
        return NextResponse.json({ message: 'Bad request' });
    }
}
