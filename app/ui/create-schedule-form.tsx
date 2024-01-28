'use client';

import { useFormState } from 'react-dom';
import { useRef, useState } from 'react';
import { addSchedules } from '@/app/lib/actions';
import { CircularProgress } from '@mui/material';

export default function CreateSchedules() {
    const scheduleForm = useRef(null);
    const [response, setResponse] = useState<string>();
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        const dispatch = await addSchedules(state, formData);
        setResponse(dispatch);

        const form = scheduleForm.current as unknown as HTMLFormElement;
        form.reset();

        return dispatch;
    }, undefined);

    return (
        <form ref={scheduleForm} action={dispatch} className='flex flex-col'>
            <h2 className='my-5 text-3xl text-red-600 font-bold'>Enter New Schedule Details</h2>

            <label htmlFor='date' className='mt-2 px-2 text-red-600'>Date</label>
            <input type="date" name='date' id='date' className='p-2 border-b-2' required />
            <label htmlFor='time' className='mt-2 px-2 text-red-600'>Time</label>
            <input type="time" name='time' id='time' className='p-2 border-b-2' required />
            <label htmlFor='length' className='mt-2 px-2 text-red-600'>Length</label>
            <input type='number' name='length' id='length' placeholder='Schedule Length' min={0} className='p-2 border-b-2' required />
            <label htmlFor='comments' className='mt-2 px-2 text-red-600'>Comments</label>
            <textarea name='comments' id='comments' placeholder='Enter any comments' className='mb-2 p-2 border-b-2' />
            
            <div className='flex items-center' aria-live="polite" aria-atomic="true">
                {response && (<p className="py-4 text-red-600">{response}</p>)}
                {response == 'Loading...' && <CircularProgress className='mx-4 max-w-6 max-h-6' />}
            </div>

            <button type='submit' onClick={() => { setResponse('Loading...'); }} className='my-5 p-5 text-white bg-red-600'>Submit</button>
        </form>
    );
}
