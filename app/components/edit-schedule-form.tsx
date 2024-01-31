'use client';

import { useFormState } from 'react-dom';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { updateSchedule, deleteSchedule } from '@/app/lib/actions';
import { QueryResultRow } from '@vercel/postgres';
import { CircularProgress } from '@mui/material';

export default function EditSchedules({ data, className }: { data: QueryResultRow, className?: string}) {
    const [action, setAction] = useState<string>();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [response, setResponse] = useState<string>();
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        const dispatch = action == 'edit' ? await updateSchedule(state, data.schedule_id, formData) : await deleteSchedule(data.schedule_id);
        if (dispatch) {
            setResponse(dispatch);
            return dispatch;
        } else {
            redirect('/schedules');
        }
    }, undefined);

    return (
        <form action={dispatch} onSubmit={() => { setSubmitting(true); setResponse('Loading...') }} className={`${className} table-row text-red-400 font-bold`}>
            <div className='table-cell p-2 border-2 text-center'>{data.number}</div>
            {'name' in data && <div className='table-cell p-2 border-2'>{data.name}</div>}
            <div className='table-cell border-2'>
                <input type='date' name='date' id='date' defaultValue={data.date_time.toISOString().split('T')[0]} className='p-2 text-center bg-transparent' disabled={submitting} required />
            </div>
            <div className='table-cell border-2'>
                <input type="time" name='time' id='time' defaultValue={data.date_time.toTimeString().split(' ')[0]} className='p-2 text-center bg-transparent' disabled={submitting} required />
            </div>
            <div className='table-cell border-2'>
                <input type='number' name='length' id='length' min={0} defaultValue={data.length} className='p-2 text-center bg-transparent' disabled={submitting} required />
            </div>
            <div className='table-cell border-2'>
                <textarea name='comments' id='comments' spellCheck={false} defaultValue={data.comments} className='p-4 align-middle text-center bg-transparent' disabled={submitting} />
            </div>
            <div className='table-cell p-2 border-2'>
                <div className='grid grid-cols-2'>
                    <button type='submit' onClick={() => { setAction('edit'); }} className='m-2 p-2 bg-blue-600 rounded-md text-white font-bold' disabled={submitting}>Edit</button>
                    <button type='submit' onClick={() => { setAction('delete'); }} className='m-2 p-2 bg-red-600 rounded-md text-white font-bold' disabled={submitting}>Delete</button>
                    
                    <div className='flex justify-center items-center col-span-2' aria-live="polite" aria-atomic="true">
                        {response && <p className="py-2 text-red-600">{response}</p>}
                        {response == 'Loading...' && <CircularProgress className='mx-4 max-w-6 max-h-6' />}
                    </div>
                </div>
            </div>
        </form>
    );
}
