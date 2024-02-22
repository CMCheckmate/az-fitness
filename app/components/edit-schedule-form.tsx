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
    const [submittable, setSubmittable] = useState<boolean>(true);
    const [response, setResponse] = useState<string>();
    const [startTimes, setStartTimes] = useState<string[]>();
    const [endTimes, setEndTimes] = useState<string[]>();
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        if (action == 'delete') {
            await deleteSchedule(data.schedule_id);
            redirect('/schedules');
        } else {
            for (const [input, value] of formData.entries()) {
                if (value != defaultData[input as keyof Data]) {
                    const dispatch = await updateSchedule(state, data.schedule_id, formData);
                    if (dispatch) {
                        setResponse(dispatch);
                        setSubmittable(true);
                        setAction('');
                        return dispatch;
                    } else {
                        redirect('/schedules');
                    }
                }
            }
            setResponse('');
            setSubmittable(true);
        }
    }, undefined);

    function generateEndTimes(givenTime: string) {
        const times = [];
        if (startTimes && givenTime) {
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
        if (action == 'edit') {
            const initialise = async () => {
                setStartTimes(await generateStartTimes(defaultData.date, defaultData.start_time));
            };
            initialise();
        }
    }, [action]);

    useEffect(() => {
        if (action == 'edit' && startTimes) {
            const startIndex = (datePicker.current as unknown as HTMLInputElement).value == defaultData.date ? startTimes.indexOf(defaultData.start_time) : 0;
            (startPicker.current as unknown as HTMLSelectElement).selectedIndex = startIndex;
            setEndTimes(generateEndTimes(startTimes[startIndex]));
        }
    }, [startTimes]);

    useEffect(() => {
        if (action == 'edit' && endTimes && endTimes.includes(defaultData.end_time)) {
            const endIndex = (datePicker.current as unknown as HTMLInputElement).value == defaultData.date ? endTimes.indexOf(defaultData.end_time) : 0;
            (endPicker.current as unknown as HTMLSelectElement).selectedIndex = endIndex;
            setSubmittable(true);
        }
    }, [endTimes])

    return (
        <form action={dispatch} onSubmit={() => { setSubmittable(false); setResponse('Loading...') }} className={`${className} table-row text-red-400 font-bold`}>
            <div className='table-cell p-2 border-2 text-center'>{data.number}</div>
            {'name' in data && <div className='table-cell p-2 border-2'>{data.name}</div>}
            <div className='table-cell border-2'>
                {
                    action == 'edit' ?
                    <input ref={datePicker} type='date' name='date' id='date' min={defaultData.date} defaultValue={defaultData.date} onChange={async (event) => { setStartTimes(await generateStartTimes(event.target.value, defaultData.start_time)); }} className='w-full p-2 text-center bg-transparent' disabled={!submittable} required /> :
                    <span className='w-full p-4 text-center bg-transparent'>{format(defaultData.date, 'dd/MM/yyyy')}</span>
                }
            </div>
            <div className='table-cell border-2'>
                {
                    action == 'edit' ?
                    <select ref={startPicker} id='start_time' name='start_time' onChange={(event) => { setEndTimes(generateEndTimes(event.target.value)); }} className='w-full p-2 appearance-none bg-transparent text-center' required >
                        {startTimes ? startTimes.map((time, index) => (
                            <option key={`start_time${index}`} value={time}>{time}</option>
                        )) : <option disabled value=''>No available times</option>}
                    </select> :
                    <span className='w-full p-4 text-center bg-transparent'>{defaultData.start_time}</span>
                }
            </div>
            <div className='table-cell border-2'>
                {
                    action == 'edit' ?
                    <select ref={endPicker} id='end_time' name='end_time' className='w-full p-2 appearance-none bg-transparent text-center' required >
                        {endTimes ? endTimes.map((time, index) => (
                            <option key={`end_time${index}`} value={time}>{time}</option>
                        )) : <option disabled value=''>No available times</option>}
                    </select> : 
                    <span className='w-full p-4 text-center bg-transparent'>{defaultData.end_time}</span>
                }
            </div>
            <div className='table-cell border-2'>
                <textarea name='address' id='address' spellCheck={false} defaultValue={defaultData.address} placeholder='Enter session address' className='w-full p-4 align-middle text-center bg-transparent' disabled={!submittable || action != 'edit'} required />
            </div>
            <div className='table-cell border-2'>
                <textarea name='comments' id='comments' spellCheck={false} defaultValue={defaultData.comments} placeholder='-' className='w-full p-4 align-middle text-center bg-transparent' disabled={!submittable || action != 'edit'} />
            </div>
            <div className='table-cell p-2 border-2'>
                <div className='flex justify-center items-center'>
                    {
                        action == 'edit' &&
                            <div className='flex justify-center items-center'>
                                <button type='submit' className='m-2 p-2 bg-green-600 rounded-md text-white font-bold' disabled={!submittable}>Change</button>
                                <button type='button' onClick={() => { setAction('') }} className='m-2 p-2 bg-gray-400 rounded-md text-white font-bold' disabled={!submittable}>Cancel</button>
                            </div>
                    }
                    {
                        action != 'edit' &&
                            <div className='flex justify-center items-center'>
                                <button type='button' onClick={() => { setAction('edit'); setSubmittable(false); }} className='m-2 p-2 bg-blue-600 rounded-md text-white font-bold'>Edit</button>
                            </div>
                    }
                    <button type='submit' onClick={() => { setAction('delete'); }} className='m-2 p-2 bg-red-600 rounded-md text-white font-bold' disabled={!submittable}>Delete</button>
                </div>
                <div className='flex justify-center items-center col-span-2' aria-live="polite" aria-atomic="true">
                    {response && <p className="py-2 text-red-600">{response}</p>}
                    {response == 'Loading...' && <CircularProgress className='mx-4 max-w-6 max-h-6' />}
                </div>
            </div>
        </form>
    );
}
