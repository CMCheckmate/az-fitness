'use client';

import { useFormState } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

export default function Login() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch} className='flex flex-col'>
            <label htmlFor='email' className='mt-2 px-2 text-red-600'>Email</label>
            <input type='text' name='email' id='email' placeholder='Enter your email' className='p-2 border-b-2' required />
            <label htmlFor='password' className='mt-2 px-2 text-red-600'>Password</label>
            <input type='text' name='password' id='password' placeholder='Enter your password' className='p-2 border-b-2' required />
            
            <div className='p-2' aria-live="polite" aria-atomic="true">
                {errorMessage && (<p className="text-red-600">{errorMessage}</p>)}
            </div>
            <button type='submit' className='my-5 p-5 text-white bg-red-600'>Submit</button>
        </form>
    )
};
