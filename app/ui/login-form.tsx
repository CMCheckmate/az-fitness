'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { redirect } from 'next/navigation';
import { authenticate } from '@/app/lib/actions';

export default function Login() {
    const [responseMessage, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {
        if (responseMessage?.includes('login')) {
            redirect('/schedules');
        }
    }, [responseMessage]);

    return (
        <form action={dispatch} className='flex flex-col'>
            <h2 className='my-5 text-3xl text-red-600 font-bold'>Please Login to Continue</h2>
            
            <label htmlFor='email' className='mt-2 px-2 text-red-600'>Email</label>
            <input type="email" name='email' id='email' placeholder='Enter your email' className='p-2 border-b-2' required />
            <label htmlFor='password' className='mt-2 px-2 text-red-600'>Password</label>
            <input type="password" name='password' id='password' placeholder='Enter your password' className='p-2 border-b-2' required />
            
            <div className='p-2' aria-live="polite" aria-atomic="true">
                {responseMessage && (<p className="text-red-600">{responseMessage}</p>)}
            </div>

            <button type='submit' className='my-5 p-5 text-white bg-red-600'>Submit</button>
        </form>
    )
};
