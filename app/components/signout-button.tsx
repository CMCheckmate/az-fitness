'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { logOut } from '@/app/lib/actions';
import { CircularProgress } from '@mui/material';

export default function SignOut() {
    const [loading, setLoading] = useState<boolean>();
    const [responseMessage, dispatch] = useFormState(async () => {
        const dispatch = await logOut();
        setLoading(false);
        return dispatch;
    }, undefined);

    return (
        <form action={dispatch} onSubmit={() => { setLoading(true); }} className=''>
            <button className='w-full p-2 flex justify-center items-center rounded-md bg-gray-400'>
                <div className='w-32 flex justify-center items-center'>
                    <span className='text-white font-bold'>Sign Out</span>
                    <div className='flex items-center' aria-live='polite' aria-atomic='true'>
                        {loading && <CircularProgress className='mx-2 max-w-5 max-h-5' />}
                    </div>
                </div>
            </button>
        </form>
    );
}
