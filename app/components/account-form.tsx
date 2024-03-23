'use client';

import { useState, useRef } from 'react';
import { useFormState } from 'react-dom';
import { authenticate, signUp } from '@/app/lib/actions';
import { CircularProgress } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';

export default function AccountForm() {
    const accountForm = useRef(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [formType, setFormType] = useState<string>('login');
    const [captcha, setCaptcha] = useState<string | null>();
    const [response, setResponse] = useState<string>();
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        if (formType == 'signUp' && !captcha) {
            setResponse('Invalid captcha.');
            setSubmitting(false);
        } else {
            const dispatch = formType == 'login' ? await authenticate(formData) : await signUp(formData);
            setResponse(dispatch);
            if (dispatch == 'Successful signup') {
                const form = accountForm.current as unknown as HTMLFormElement;
                form.reset();
                
                setFormType('login');
            }
            setSubmitting(false);

            return dispatch;
        }
    }, undefined);

    return (
        <form ref={accountForm} action={dispatch} onSubmit={() => { setSubmitting(true); setResponse('Loading...'); }}>
            <fieldset className='p-10' disabled={submitting}>
                {
                    formType == 'login' ?
                        <div className='mb-5 flex flex-col'>
                            <h2 className='my-5 text-3xl text-red-600 font-bold'>Login</h2>

                            <label htmlFor='email' className='mt-4 px-2 text-xl text-red-600'>Email</label>
                            <input type='email' name='email' id='email' placeholder='Enter your email' className='p-2 border-b-2' required />
                            <label htmlFor='password' className='mt-4 px-2 text-xl text-red-600'>Password</label>
                            <input type='password' name='password' id='password' placeholder='Enter your password' className='p-2 border-b-2' required />
                        </div> :
                        <div className='flex flex-col'>
                            <h2 className='my-5 text-3xl text-red-600 font-bold'>Sign Up</h2>

                            <label htmlFor='name' className='mt-4 px-2 text-xl text-red-600'>Name</label>
                            <input type='text' name='name' id='name' placeholder='Enter your name' maxLength={45} className='p-2 border-b-2' required />
                            <label htmlFor='email' className='mt-4 px-2 text-xl text-red-600'>Email</label>
                            <input type='email' name='email' id='email' placeholder='Enter your email' maxLength={45} className='p-2 border-b-2' required />
                            <label htmlFor='password' className='mt-4 px-2 text-xl text-red-600'>Password</label>
                            <input type='password' name='password' id='password' placeholder='Enter your password' minLength={8} className='p-2 border-b-2' required />
                            <label htmlFor='confirmPassword' className='mt-4 px-2 text-xl text-red-600'>Confirm Password</label>
                            <input type='password' name='confirmPassword' id='confirmPassword' placeholder='Re-type your password' className='p-2 border-b-2' required />

                            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={setCaptcha} className='max-w-16 origin-top-left scale-[75%] mt-5' />
                        </div>
                }

                <div className='flex items-center' aria-live='polite' aria-atomic='true'>
                    {response && <p className='py-4 text-red-600'>{response}</p>}
                    {response == 'Loading...' && <CircularProgress className='mx-4 max-w-6 max-h-6' />}
                </div>

                <button type='button' onClick={() => {
                    if (formType == 'login') {
                        setFormType('signUp');
                    } else {
                        setFormType('login');
                    }
                    setResponse('');
                    setCaptcha(null);

                    const form = accountForm.current as unknown as HTMLFormElement;
                    form.reset();
                }} className='underline'>{formType == 'login' ? 'New user? Sign up here' : 'Return to login'}</button>

                <button type='submit' className='w-full my-5 p-5 text-white bg-red-600'>Submit</button>
            </fieldset>
        </form>
    )
};
