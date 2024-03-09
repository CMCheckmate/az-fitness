'use client';

import { useFormState } from 'react-dom';
import { useState } from 'react';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';
import { updateSchedule, deleteSchedule } from '@/app/lib/actions';
import { QueryResultRow } from '@vercel/postgres';
import { CircularProgress } from '@mui/material';

export default function EditSchedules({ data, className }: { data: QueryResultRow, className?: string }) {
    interface Data {
        date: string,
        start_time: string,
        end_time: string,
        address: string,
        comments: string,
        schedules: { [key: string]: { [key: string]: string[] } }
    }

    const defaultData = data as Data;
    const [date, setDate] = useState<string>(defaultData.date);
    const [chosenTimes, setChosenTimes] = useState<{ start: string, end: string }>({ start: defaultData.start_time, end: defaultData.end_time });
    const [action, setAction] = useState<string>();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [response, setResponse] = useState<string>();
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        if (action == 'delete') {
            await deleteSchedule(data.schedule_id);
            redirect('/schedules');
        } else {
            for (const [input, value] of formData.entries()) {
                if (value != defaultData[input as keyof Data]) {
                    const dispatch = await updateSchedule(data.schedule_id, formData);
                    if (dispatch) {
                        setResponse(dispatch);
                        setSubmitting(false);
                        setAction('');
                        return dispatch;
                    } else {
                        redirect('/schedules');
                    }
                }
            }
            setResponse('');
            setSubmitting(false);
        }
    }, undefined);

    return (
        <form action={dispatch} onSubmit={() => { setSubmitting(true); setResponse('Loading...') }} className={`${className} table-row divide-x-2 divide-y-2 text-red-400 text-center font-bold`}>
            <div className='table-cell border-t-2 p-2'>{data.number}</div>
            {
                'name' in data && 
                    <div className='table-cell p-2'>
                        <p className='min-w-max'>{data.name}</p>
                    </div>
            }
            <div className='table-cell'>
                {
                    action == 'edit' ?
                        <input type='date' name='date' id='date' min={defaultData.date} defaultValue={defaultData.date} onChange={(event) => { const date = event.target.value in defaultData.schedules ? event.target.value : String(new Date(event.target.value).getDay()); setDate(date); if (date == defaultData.date) { setChosenTimes({ start: defaultData.start_time, end: defaultData.end_time }) } else { setChosenTimes({ start: Object.keys(defaultData.schedules[date])[0], end: Object.values(defaultData.schedules[date])[0][0] }) } }} className='w-full p-2 bg-transparent text-center' disabled={submitting} required /> :
                        <p className='w-full p-4 px-10 bg-transparent'>{format(defaultData.date, 'dd/MM/yyyy')}</p>
                }
            </div>
            <div className='table-cell'>
                {
                    action == 'edit' ?
                        <select id='startTime' name='startTime' value={chosenTimes.start} onChange={(event) => { setChosenTimes({ start: event.target.value, end: chosenTimes.end }); }} className='w-full min-w-max p-2 appearance-none bg-transparent text-center' required >
                            {defaultData.schedules[date] ? Object.keys(defaultData.schedules[date]).map((time, index) => (
                                <option key={`start_time_${index + 1}`} value={time}>{time}</option>
                            )) : <option disabled value=''>No available times</option>}
                        </select> :
                        <p className='min-w-max p-4 bg-transparent'>{defaultData.start_time}</p>
                }
            </div>
            <div className='table-cell'>
                {
                    action == 'edit' ?
                        <select id='endTime' name='endTime' value={chosenTimes.end} onChange={(event) => { setChosenTimes({ start: chosenTimes.start, end: event.target.value }); }} className='w-full min-w-max p-2 appearance-none bg-transparent text-center' required >
                            {defaultData.schedules[date] && defaultData.schedules[date][chosenTimes.start] ? Object.values(defaultData.schedules[date][chosenTimes.start]).map((time, index) => (
                                <option key={`end_time_${index + 1}`} value={time}>{time}</option>
                            )) : <option disabled value=''>No available times</option>}
                        </select> :
                        <p className='p-4 min-w-max bg-transparent'>{defaultData.end_time}</p>
                }
            </div>
            <div className='table-cell'>
                {
                    action == 'edit' ?
                        <div>
                            <input type='text' name='address' list='addressList' maxLength={95} defaultValue={defaultData.address} placeholder='Enter your desired address' className='p-4 bg-transparent text-center' spellCheck={false} disabled={submitting || action != 'edit'} required />
                            <datalist id='addressList'>
                                <option value='252 Oteha Valley Road, Albany'>252 Oteha Valley Road, Albany</option>
                                <option value='The Foundation 270 Oteha Valley Road, Albany'>The Foundation 270 Oteha Valley Road, Albany</option>
                                <option value='C3/65 Greville Road, Pinehill'>C3/65 Greville Road, Pinehill</option>
                                <option value='24 Tawa Drive, Albany'>24 Tawa Drive, Albany</option>
                            </datalist>
                        </div> :
                        <textarea value={defaultData.address} placeholder='-' className='w-max p-4 px-10 resize-none align-middle bg-transparent text-center' disabled/>
                }
            </div>
            <div className='table-cell'>
                <textarea name='comments' id='comments' maxLength={80} defaultValue={defaultData.comments} placeholder='-' className='w-max p-4 resize-none align-middle bg-transparent text-center' disabled={submitting || action != 'edit'} />
            </div>
            <div className='table-cell p-2'>
                <div className='flex justify-center items-center'>
                    {
                        action == 'edit' &&
                        <div className='flex justify-center items-center'>
                            <button type='submit' className='m-2 p-2 bg-green-600 rounded-md text-white font-bold' disabled={submitting}>Submit</button>
                            <button type='button' onClick={() => { setAction('') }} className='m-2 p-2 bg-gray-400 rounded-md text-white font-bold' disabled={submitting}>Cancel</button>
                        </div>
                    }
                    {
                        action != 'edit' &&
                        <div className='flex justify-center items-center'>
                                <button type='button' onClick={() => { setAction('edit'); setChosenTimes({ start: defaultData.start_time, end: defaultData.end_time }); }} className='m-2 p-2 bg-blue-600 rounded-md text-white font-bold'>Change</button>
                        </div>
                    }
                    {
                        action != 'edit' && 
                        <button type='submit' onClick={() => { setAction('delete'); }} className='m-2 p-2 bg-red-600 rounded-md text-white font-bold' disabled={submitting}>Delete</button>
                    }
                </div>
                <div className='flex justify-center items-center col-span-2' aria-live="polite" aria-atomic="true">
                    {response && <p className="py-2 text-red-600">{response}</p>}
                    {response == 'Loading...' && <CircularProgress className='mx-4 max-w-6 max-h-6' />}
                </div>
            </div>
        </form>
    );
}
