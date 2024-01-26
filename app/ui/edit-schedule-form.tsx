'use client';

import { useFormState } from 'react-dom';
import { useState } from 'react';
import { updateSchedule, deleteSchedule } from '@/app/lib/actions';
import { QueryResultRow } from '@vercel/postgres';

export default function EditSchedules({ data, className }: { data: QueryResultRow, className?: string}) {
    const [action, setAction] = useState<string>();
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        if (action == 'edit') {
            return await updateSchedule(state, data.schedule_id, formData);
        } else if (action == 'delete') {
            return await deleteSchedule(data.schedule_id);
        }
    }, undefined);
    
    return (
        <form action={dispatch} className={`${className} table-row text-red-400 font-bold`}>
            <div className='table-cell p-2 border-2 text-center'>{data.number}</div>
            {'name' in data && <div className='table-cell p-2 border-2'>{data.name}</div>}
            <div className='table-cell border-2'>
                <input type='date' name='date' id='date' defaultValue={data.date_time.toISOString().split('T')[0]} className='p-2 bg-transparent' required />
            </div>
            <div className='table-cell border-2'>
                <input type="time" name='time' id='time' defaultValue={data.date_time.toTimeString().split(' ')[0]} className='p-2 bg-transparent' required />
            </div>
            <div className='table-cell border-2'>
                <input type='number' name='length' id='length' min={0} defaultValue={data.length} className='p-2 bg-transparent' required />
            </div>
            <div className='table-cell border-2'>
                <textarea name='comments' id='comments' spellCheck={false} defaultValue={data.comments} className='align-middle p-4 bg-transparent' />
            </div>
            <div className='table-cell p-2 border-2'>
                <div className='grid grid-cols-2'>
                    <button type='submit' onClick={() => { setAction('edit'); }} className='m-2 p-2 bg-blue-600 rounded-md text-white font-bold'>Edit</button>
                    <button type='submit' onClick={() => { setAction('delete'); }} className='m-2 p-2 bg-red-600 rounded-md text-white font-bold'>Delete</button>
                    
                    <div className='col-span-2' aria-live="polite" aria-atomic="true">
                        {responseMessage && (<p className="text-red-600">{responseMessage}</p>)}
                    </div>
                </div>
            </div>
        </form>
    );
}
