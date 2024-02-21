'use client';

import { useFormState } from 'react-dom';
import { useRef, useState, useEffect } from 'react';
import { format, parse } from 'date-fns';
import { redirect } from 'next/navigation';
import { generateStartTimes, updateSchedule, deleteSchedule } from '@/app/lib/actions';
import { QueryResultRow } from '@vercel/postgres';
import { CircularProgress } from '@mui/material';

export default function EditSchedules({ data, className }: { data: QueryResultRow, className?: string}) {
    interface Data {
        date: string,
        start_time: string,
        end_time: string,
        address: string,
        comments: string
    }
    const defaultData = {
        ...data,
        date: format(data.start_time, 'yyyy-MM-dd'),
        start_time: format(data.start_time, 'hh:mm a'),
        end_time: format(data.end_time, 'hh:mm a')
    } as Data;
    const datePicker = useRef(null);
    const startPicker = useRef(null);
    const endPicker = useRef(null);
    const [action, setAction] = useState<string>();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [response, setResponse] = useState<string>();
    const [startTimes, setStartTimes] = useState<string[]>();
    const [endTimes, setEndTimes] = useState<string[]>();
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        for (const [input, value] of formData.entries()) {
            if (String(value).replace('.0', '') != defaultData[input as keyof Data] || action == 'delete') {
                const dispatch = action == 'edit' ? await updateSchedule(state, data.schedule_id, formData) : await deleteSchedule(data.schedule_id);
                if (dispatch) {
                    setResponse(dispatch);
                    setSubmitting(false);
                    return dispatch;
                } else {
                    redirect('/schedules');
                }
            }
        }
        setResponse('');
        setSubmitting(false);
    }, undefined);

    function generateEndTimes(givenTime: string) {
        const times = [];
        if (startTimes) {
            const chosenTime = parse(givenTime, 'hh:mm a', new Date());
            while (times.length < 2 / 0.5) {
                chosenTime.setMinutes(chosenTime.getMinutes() + 30);
                const time = format(chosenTime, 'hh:mm a');
                times.push(time);
                if (!startTimes.includes(time)) {
                    break;
                }
            }
            (endPicker.current as unknown as HTMLSelectElement).selectedIndex = 0;
        }
        return times;
    }

    useEffect(() => {
        if (startTimes) {
            const startIndex = (datePicker.current as unknown as HTMLInputElement).value == defaultData.date ? startTimes.indexOf(defaultData.start_time) : 0;
            (startPicker.current as unknown as HTMLSelectElement).selectedIndex = startIndex;
            setEndTimes(generateEndTimes(startTimes[startIndex]));
        } else {
            const initialise = async() => {
                setStartTimes(await generateStartTimes(defaultData.date, defaultData.start_time));
            }
            initialise();
        }
    }, [startTimes]);

    useEffect(() => {
        if (endTimes && endTimes.includes(defaultData.end_time)) {
            const endIndex = (datePicker.current as unknown as HTMLInputElement).value == defaultData.date ? endTimes.indexOf(defaultData.end_time) : 0;
            (endPicker.current as unknown as HTMLSelectElement).selectedIndex = endIndex;
        }
    }, [endTimes])

    return (
        <form action={dispatch} onSubmit={() => { setSubmitting(true); setResponse('Loading...') }} className={`${className} table-row text-red-400 font-bold`}>
            <div className='table-cell p-2 border-2 text-center'>{data.number}</div>
            {'name' in data && <div className='table-cell p-2 border-2'>{data.name}</div>}
            <div className='table-cell border-2'>
                <input ref={datePicker} type='date' name='date' id='date' min={defaultData.date} defaultValue={defaultData.date} onChange={async (event) => { setStartTimes(await generateStartTimes(event.target.value, defaultData.start_time)); }} className='w-full p-2 text-center bg-transparent' disabled={submitting} required />
            </div>
            <div className='table-cell border-2'>
                <select ref={startPicker} id='startTime' name='startTime' onChange={(event) => { setEndTimes(generateEndTimes(event.target.value)); }} className='w-full p-2 appearance-none bg-transparent text-center' required >
                    {startTimes ? startTimes.map((time, index) => (
                        <option key={`start_time${index}`} value={time}>{time}</option>
                    )) : <option disabled value=''>No available times</option>}
                </select>
            </div>
            <div className='table-cell border-2'>
                <select ref={endPicker} id='endTime' name='endTime' className='w-full p-2 appearance-none bg-transparent text-center' required >
                    {endTimes ? endTimes.map((time, index) => (
                        <option key={`end_time${index}`} value={time}>{time}</option>
                    )) : <option disabled value=''>No available times</option>}
                </select>
            </div>
            <div className='table-cell border-2'>
                <textarea name='address' id='address' spellCheck={false} defaultValue={defaultData.address} placeholder='Enter your desired address' className='w-full p-4 align-middle text-center bg-transparent' disabled={submitting} required />
            </div>
            <div className='table-cell border-2'>
                <textarea name='comments' id='comments' spellCheck={false} defaultValue={defaultData.comments} placeholder='Enter any comments' className='w-full p-4 align-middle text-center bg-transparent' disabled={submitting} />
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
