'use client';

import Link from 'next/link';

export function TestimonialForm() {
    return (
        <form>
            <h3 className='text-center text-xl text-white'>How Was Your Experience?</h3>

            <div className=' grid grid-cols-2'>
                <input type="text" placeholder='First Name' className='m-5 p-5 border-b-2' required />

                <input type="text" placeholder='Last Name' className='m-5 p-5 border-b-2' />

                <input type="text" placeholder='Email' className='m-5 p-5 border-b-2' required />

                <input type="text" placeholder='Phone' className='m-5 p-5 border-b-2' />

                <input type="text" placeholder='Write your review here' className='col-span-2 m-5 p-5 border-b-2' required />

                <p className='col-span-2 m-5 text-white'>Would you recommend us to your friends?</p>
                <label htmlFor='Yes' className='mx-5'>
                    <input type='radio' name='recommend' id='Yes' value='Yes' />
                    <span className='p-5 text-white'>Yes</span>
                </label>

                <label htmlFor='No' className='mx-5'>
                    <input type='radio' name='recommend' id='No' value='No' />
                    <span className='p-5 text-white'>No</span>
                </label>

                <textarea placeholder='Anything else you would like to add?' className='col-span-2 m-5 p-5 border-b-2' />

                <Link href='mailto:mingraygoy@gmail.com' target='_blank' className='m-5 col-start-2 flex justify-end items-center'>
                    <button type='button' className='p-5 w-1/2 text-red-600 bg-white'>Submit</button>
                </Link>
            </div>
        </form>
    );
}

export default function ContactForm() {
    return (
        <form className='flex flex-col'>
            <h2 className='text-center text-4xl text-red-600 font-bold'>CONTACT ME</h2>

            <label htmlFor='name' className='mt-2 px-2 text-red-600'>Name *</label>
            <input type='text' id='name' placeholder='Enter your name' className='p-2 border-b-2' required />
            <label htmlFor='email' className='mt-2 px-2 text-red-600'>Email *</label>
            <input type='text' id='email' placeholder='Enter your email' className='p-2 border-b-2' required />
            <label htmlFor='subject' className='mt-2 px-2 text-red-600'>Subject</label>
            <input type='text' id='subject' placeholder='Type the Subject' className='p-2 border-b-2' />
            <label htmlFor='message' className='mt-2 px-2 text-red-600'>Message</label>
            <textarea id='message' placeholder='Type your message here...' className='p-2 border-b-2' required />

            <Link href='mailto:mingraygoy@gmail.com' target='_blank'>
                <button type='button' className='w-full my-5 p-5 text-white bg-red-600'>Submit</button>
            </Link>
        </form>
    );
}
