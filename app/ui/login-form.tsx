'use client';

import { useEffect, useState, useRef } from 'react';
import { useFormState } from 'react-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { authenticate, signUp } from '@/app/lib/actions';

export default function Login() {
    const accountForm = useRef(null);
    const [formType, setFormType] = useState<string>('login');
    const [captcha, setCaptcha] = useState<string | null>();
    const [response, setResponse] = useState<string>();
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        if (formType == 'login') {
            return await authenticate(state, formData);
        } else if (formType == 'signUp') {
            if (captcha) {
                return await signUp(state, formData);
            } else {
                setResponse('Invalid captcha.');
            }
        }
    }, undefined);

    useEffect(() => {
        if (responseMessage?.includes('Successful signup')) {
            const form = accountForm.current as unknown as HTMLFormElement;
            form.reset(); 

            setFormType('login');
        }

        setResponse(responseMessage);
        const timeout = setTimeout(() => { setResponse(''); }, 5000);
        return () => { clearTimeout(timeout); };
    }, [responseMessage]);

    return (
        <form ref={accountForm} action={dispatch} className='flex flex-col'>
            {
                formType == 'login' ? 
                    <div className='flex flex-col'>
                        <h2 className='my-5 text-3xl text-red-600 font-bold'>Login to Continue</h2>

                        <label htmlFor='email' className='mt-4 px-2 text-red-600'>Email</label>
                        <input type='email' name='email' id='email' placeholder='Enter your email' className='p-2 border-b-2' required />
                        <label htmlFor='password' className='mt-4 px-2 text-red-600'>Password</label>
                        <input type='password' name='password' id='password' placeholder='Enter your password' className='p-2 border-b-2' required />
                    </div>  :
                    <div className='flex flex-col'>
                        <h2 className='my-5 text-3xl text-red-600 font-bold'>Sign Up</h2>

                        <label htmlFor='name' className = 'mt-4 px-2 text-red-600'>Name</label>
                        <input type='text' name='name' id='name' placeholder='Enter your name' className='p-2 border-b-2' required />
                        <label htmlFor='email' className='mt-4 px-2 text-red-600'>Email</label>
                        <input type='email' name='email' id='email' placeholder='Enter your email' className='p-2 border-b-2' required />
                        <label htmlFor='password' className='mt-4 px-2 text-red-600'>Password</label>
                        <input type='password' name='password' id='password' placeholder='Enter your password' className='p-2 border-b-2' required />
                        <label htmlFor='confirmPassword' className='mt-4 px-2 text-red-600'>Confirm Password</label>
                        <input type='password' name='confirmPassword' id='confirmPassword' placeholder='Re-type your password' className='p-2 border-b-2' required />

                        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={setCaptcha} className='mt-5' />
                    </div>
            }

            <div className='py-4' aria-live='polite' aria-atomic='true'>
                {response && (<p className='text-red-600'>{response}</p>)}
            </div>

            <button type='button' onClick={() => {
                if (formType == 'login') {
                    setFormType('signUp');
                } else {
                    setFormType('login');
                }
                const form = accountForm.current as unknown as HTMLFormElement;
                form.reset(); 
            }} className='text-left text-sm underline'>{formType == 'login' ? 'New user? Sign up here' : 'Return to login'}</button>

            <button type='submit' className='my-5 p-5 text-white bg-red-600'>Submit</button>
        </form>
    )
};
