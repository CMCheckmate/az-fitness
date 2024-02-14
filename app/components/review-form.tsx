'use client';

import { useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { sendEmailForm } from '@/app/lib/actions';
import { CircularProgress } from '@mui/material';

export default function TestimonialForm() {
    const reviewForm = useRef(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [response, setResponse] = useState<string>();
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        const dispatch = await sendEmailForm(state, 'Review', formData);
        setResponse(dispatch);

        const form = reviewForm.current as unknown as HTMLFormElement;
        form.reset();
        setSubmitting(false);

        return dispatch;
    }, undefined);

    return (
        <form ref={reviewForm} action={dispatch} onSubmit={() => { setSubmitting(true); setResponse('Loading...'); }}>
            <fieldset disabled={submitting}>
                <h3 className='text-center text-xl text-white'>How Was Your Experience?</h3>

                <div className=' grid grid-cols-2'>
                    <input type='text' name='firstName' id='firstName' placeholder='First Name' className='m-5 p-5 border-b-2' required />

                    <input type='text' name='lastName' id='lastName' placeholder='Last Name' className='m-5 p-5 border-b-2' />

                    <input type='email' name='email' id='email' placeholder='Email' className='m-5 p-5 border-b-2' required />

                    <input type='tel' pattern='[0-9]{10}' name='phone' id='phone' placeholder='Phone (format: 0123456789)' className='m-5 p-5 border-b-2' />

                    <input type='text' name='review' id='review' placeholder='Write your review here' className='col-span-2 m-5 p-5 border-b-2' required />

                    <p className='col-span-2 m-5 text-white'>Would you recommend us to your friends?</p>
                    <label htmlFor='Yes' className='mx-5'>
                        <input type='radio' name='recommend' id='Yes' value='Yes' required />
                        <span className='p-5 text-white'>Yes</span>
                    </label>

                    <label htmlFor='No' className='mx-5'>
                        <input type='radio' name='recommend' id='No' value='No' required />
                        <span className='p-5 text-white'>No</span>
                    </label>

                    <textarea name='extra' id='extra' placeholder='Anything else you would like to add?' className='col-span-2 m-5 p-5 border-b-2' />

                    <div className='px-5 flex items-center' aria-live='polite' aria-atomic='true'>
                        {response && (<p className='py-4 text-white'>{response}</p>)}
                        {response == 'Loading...' && <CircularProgress className='mx-4 max-w-6 max-h-6' />}
                    </div>

                    <button type='submit' className='m-5 p-5 w-1/2 col-start-1 text-red-600 bg-white'>Submit</button>
                </div>
            </fieldset>
        </form>
    );
}
