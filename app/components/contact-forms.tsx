'use client';

import { useFormState } from 'react-dom';
import { sendContactForm } from '@/app/lib/actions';
import Link from 'next/link';

export function TestimonialForm() {
    const [responseMessage, dispatch] = useFormState(sendContactForm, undefined);

    return (
        <form action={dispatch}>
            <h3 className='text-center text-xl text-white'>How Was Your Experience?</h3>

            <div className=' grid grid-cols-2'>
                <input type="text" name='firstName' id='firstName' placeholder='First Name' className='m-5 p-5 border-b-2' required />

                <input type="text" name='lastName' id='lastName' placeholder='Last Name' className='m-5 p-5 border-b-2' />

                <input type="text" name='email' id='email' placeholder='Email' className='m-5 p-5 border-b-2' required />

                <input type="text" name='phone' id='phone' placeholder='Phone' className='m-5 p-5 border-b-2' />

                <input type="text" name='review' id='review' placeholder='Write your review here' className='col-span-2 m-5 p-5 border-b-2' required />

                <p className='col-span-2 m-5 text-white'>Would you recommend us to your friends?</p>
                <label htmlFor='Yes' className='mx-5'>
                    <input type='radio' name='recommend' id='Yes' value='Yes' />
                    <span className='p-5 text-white'>Yes</span>
                </label>

                <label htmlFor='No' className='mx-5'>
                    <input type='radio' name='recommend' id='No' value='No' />
                    <span className='p-5 text-white'>No</span>
                </label>

                <textarea name='extra' id='extra' placeholder='Anything else you would like to add?' className='col-span-2 m-5 p-5 border-b-2' />

                <Link href='mailto:mingraygoy@gmail.com' target='_blank' className='m-5 col-start-2 flex justify-end items-center'>
                    <button type='button' className='p-5 w-1/2 text-red-600 bg-white'>Submit</button>
                </Link>
            </div>
        </form>
    );
}

export default function ContactForm() {
    const [responseMessage, dispatch] = useFormState(sendContactForm, undefined);

    return (
        <form action={dispatch} className='flex flex-col'>
            <h2 className='text-center text-4xl text-red-600 font-bold'>CONTACT ME</h2>

            <label htmlFor='name' className='mt-2 px-2 text-red-600'>Name *</label>
            <input type='text' name='name' id='name' placeholder='Enter your name' className='p-2 border-b-2' required />
            <label htmlFor='email' className='mt-2 px-2 text-red-600'>Email *</label>
            <input type='text' name='email' id='email' placeholder='Enter your email' className='p-2 border-b-2' required />
            <label htmlFor='subject' className='mt-2 px-2 text-red-600'>Subject</label>
            <input type='text' name='subject' id='subject' placeholder='Type the Subject' className='p-2 border-b-2' />
            <label htmlFor='message' className='mt-2 px-2 text-red-600'>Message</label>
            <textarea name='message' id='message' placeholder='Type your message here...' className='p-2 border-b-2' required />

            <button type='submit' className='w-full my-5 p-5 text-white bg-red-600'>Submit</button>
        </form>
    );
}
