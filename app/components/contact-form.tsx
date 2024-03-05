'use client';

import { useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { sendEmailForm } from '@/app/lib/actions';
import { CircularProgress } from '@mui/material';

export default function ContactForm() {
    const contactForm = useRef(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [response, setResponse] = useState<string>();
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        const dispatch = await sendEmailForm('Contact', formData);
        setResponse(dispatch);

        const form = contactForm.current as unknown as HTMLFormElement;
        form.reset();
        setSubmitting(false);
        
        return dispatch;
    }, undefined);

    return (
        <form ref={contactForm} action={dispatch} onSubmit={() => { setSubmitting(true); setResponse('Loading...'); }}>
            <fieldset className='flex flex-col' disabled={submitting}>
                <h2 className='text-center text-4xl text-red-600 font-bold'>CONTACT ME</h2>

                <label htmlFor='name' className='mt-2 px-2 text-red-600'>Name *</label>
                <input type='text' name='name' id='name' placeholder='Enter your name' className='p-2 border-b-2' required />
                <label htmlFor='email' className='mt-2 px-2 text-red-600'>Email *</label>
                <input type='email' name='email' id='email' placeholder='Enter your email' className='p-2 border-b-2' required />
                <label htmlFor='subject' className='mt-2 px-2 text-red-600'>Subject</label>
                <input type='text' name='subject' id='subject' placeholder='Type the Subject' className='p-2 border-b-2' />
                <label htmlFor='message' className='mt-2 px-2 text-red-600'>Message</label>
                <textarea name='message' id='message' placeholder='Type your message here...' className='p-2 border-b-2' required />

                <div className='flex items-center' aria-live='polite' aria-atomic='true'>
                    {response && (<p className='py-4 text-red-600'>{response}</p>)}
                    {response == 'Loading...' && <CircularProgress className='mx-4 max-w-6 max-h-6' />}
                </div>

                <button type='submit' className='w-full my-5 p-5 text-white bg-red-600'>Submit</button>
            </fieldset>
        </form>
    );
}
