'use client';

import { useFormState } from 'react-dom';
import { useRef } from 'react';
import { addSchedules } from '@/app/lib/actions';

export default function CreateSchedules() {
    const scheduleForm = useRef(null);
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        const dispatch = await addSchedules(state, formData);
        
        const form = scheduleForm.current as unknown as HTMLFormElement;
        form.reset();

        return dispatch;
    }, undefined);

    return (
        <form ref={scheduleForm} action={dispatch} className='flex flex-col'>
            <h2 className='my-5 text-3xl text-red-600 font-bold'>Enter New Schedule Details</h2>

            <label htmlFor='date' className='mt-2 px-2 text-red-600'>Date</label>
            <input type="date" name='date' id='date' placeholder='Schedule Date' className='p-2 border-b-2' required />
            <label htmlFor='time' className='mt-2 px-2 text-red-600'>Time</label>
            <input type="time" name='time' id='time' placeholder='Schedule Time' className='p-2 border-b-2' required />
            <label htmlFor='length' className='mt-2 px-2 text-red-600'>Length</label>
            <input type='number' name='length' id ='length' placeholder='Schedule Length' className='p-2 border-b-2' required />
            <label htmlFor='comments' className='mt-2 px-2 text-red-600'>Comments</label>
            <input type='text' name='comments' id='comments' placeholder='Enter any comments' className='p-2 border-b-2' />
            
            <div className='p-2' aria-live="polite" aria-atomic="true">
                {responseMessage && (<p className="text-red-600">{responseMessage}</p>)}
            </div>

            <button type='submit' className='my-5 p-5 text-white bg-red-600'>Submit</button>
        </form>
    );
}
