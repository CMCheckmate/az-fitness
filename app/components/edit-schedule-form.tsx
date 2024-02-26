'use client';

import { useFormState } from 'react-dom';
import { useState } from 'react';
import { subMinutes, addMinutes, parse, format } from 'date-fns';
import { redirect } from 'next/navigation';
import { updateSchedule, deleteSchedule } from '@/app/lib/actions';
import { QueryResultRow } from '@vercel/postgres';
import { CircularProgress } from '@mui/material';

export default function EditSchedules({ data, className }: { data: QueryResultRow, className?: string}) {
    interface Data {
        date: string,
        start_time: string,
        end_time: string,
        address: string,
        comments: string,
        schedules: { [key: string]: { [key: string]: string[] } }
    }
    const defaultData = {
        ...data,
        schedules: getScheduleTimes(data.date)
    } as Data;
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
                    const dispatch = await updateSchedule(state, data.schedule_id, formData);
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

    function getScheduleTimes(date: string, interval: number = 30, maxScheduleTime: number = 120) {
        const currentSchedules = {[date]: {}} as Data['schedules'];
        const startParse = parse(data.start_time, 'hh:mm a', new Date());
        const endTime = parse(data.end_time, 'hh:mm a', new Date());
        const startTime = new Date(subMinutes(startParse, interval));
        while (startTime < endTime || (startTime.getTime() == endTime.getTime() && format(addMinutes(endTime, interval), 'hh:mm a') in data.schedules[date])) {
            if (!(startTime < data.start_time) || format(subMinutes(startTime, interval), 'hh:mm a') in data.schedules[date]) {
                const initialTime = format(startTime, 'hh:mm a');
                const time = new Date(startTime);
                currentSchedules[date][initialTime] = [];
                while (currentSchedules[date][initialTime].length < maxScheduleTime / interval) {
                    time.setMinutes(time.getMinutes() + interval);
                    const currentTime = format(time, 'hh:mm a');
                    currentSchedules[date][initialTime].push(currentTime);
                    if (time > endTime && !(currentTime in data.schedules[date])) {
                        break;
                    }
                }
            }
            startTime.setMinutes(startTime.getMinutes() + interval);
        }
        const newSchedules = { ...data.schedules };
        const scheduleTimes = Object.keys(data.schedules[date]);
        newSchedules[date] = {};
        for (const time of scheduleTimes) {
            const currentTime = parse(time, 'hh:mm a', new Date());
            if (currentSchedules[date] && currentTime > startParse) {
                for (const newTime of Object.keys(currentSchedules[date])) {
                    newSchedules[date][newTime] = currentSchedules[date][newTime];
                }
                currentSchedules[date] = {};
            }
            newSchedules[date][time] = data.schedules[date][time];
        }
        if (currentSchedules[date]) {
            newSchedules[date] = Object.assign(newSchedules[date], currentSchedules[date]);
        }
        return newSchedules;
    }

    return (
        <form action={dispatch} onSubmit={() => { setSubmitting(true); setResponse('Loading...') }} className={`${className} table-row text-red-400 font-bold`}>
            <div className='table-cell p-2 border-2 text-center'>{data.number}</div>
            {'name' in data && <div className='table-cell p-2 border-2'>{data.name}</div>}
            <div className='table-cell border-2'>
                {
                    action == 'edit' ? 
                    <input type='date' name='date' id='date' min={defaultData.date} defaultValue={defaultData.date} onChange={(event) => { const date = event.target.value in defaultData.schedules ? event.target.value : String(new Date(event.target.value).getDay()); setDate(date); if (date == defaultData.date) { setChosenTimes({ start: defaultData.start_time, end: defaultData.end_time }) } else { setChosenTimes({ start: Object.keys(defaultData.schedules[date])[0], end: Object.values(defaultData.schedules[date])[0][0] }) } }} className='w-full p-2 text-center bg-transparent' disabled={submitting} required /> :
                    <span className='w-full p-4 text-center bg-transparent'>{format(defaultData.date, 'dd/MM/yyyy')}</span>
                }
            </div>
            <div className='table-cell border-2'>
                {
                    action == 'edit' ?
                    <select id='startTime' name='startTime' value={chosenTimes.start} onChange={(event) => { setChosenTimes({ start: event.target.value, end: chosenTimes.end }); } } className='w-full p-2 appearance-none bg-transparent text-center' required >
                        {defaultData.schedules[date] ? Object.keys(defaultData.schedules[date]).map((time, index) => (
                            <option key={`start_time_${index + 1}`} value={time}>{time}</option>
                        )) : <option disabled value=''>No available times</option>}
                    </select> :
                    <span className='w-full p-4 text-center bg-transparent'>{defaultData.start_time}</span>
                }
            </div>
            <div className='table-cell border-2'>
                {
                    action == 'edit' ?
                    <select id='endTime' name='endTime' value={chosenTimes.end} onChange={(event) => { setChosenTimes({ start: chosenTimes.start, end: event.target.value }); }} className='w-full p-2 appearance-none bg-transparent text-center' required >
                        {defaultData.schedules[date][chosenTimes.start] ? Object.values(defaultData.schedules[date][chosenTimes.start]).map((time, index) => (
                            <option key={`end_time_${index + 1}`} value={time}>{time}</option>
                        )) : <option disabled value=''>No available times</option>}
                    </select> : 
                    <span className='w-full p-4 text-center bg-transparent'>{defaultData.end_time}</span>
                }
            </div>
            <div className='table-cell border-2'>
                <textarea name='address' id='address' spellCheck={false} defaultValue={defaultData.address} placeholder='Enter session address' className='w-full p-4 align-middle text-center bg-transparent' disabled={submitting || action != 'edit'} required />
            </div>
            <div className='table-cell border-2'>
                <textarea name='comments' id='comments' spellCheck={false} defaultValue={defaultData.comments} placeholder='-' className='w-full p-4 align-middle text-center bg-transparent' disabled={submitting || action != 'edit'} />
            </div>
            <div className='table-cell p-2 border-2'>
                <div className='flex justify-center items-center'>
                    {
                        action == 'edit' &&
                            <div className='flex justify-center items-center'>
                                <button type='submit' className='m-2 p-2 bg-green-600 rounded-md text-white font-bold' disabled={submitting}>Change</button>
                                <button type='button' onClick={() => { setAction('') }} className='m-2 p-2 bg-gray-400 rounded-md text-white font-bold' disabled={submitting}>Cancel</button>
                            </div>
                    }
                    {
                        action != 'edit' &&
                            <div className='flex justify-center items-center'>
                                <button type='button' onClick={() => { setAction('edit'); }} className='m-2 p-2 bg-blue-600 rounded-md text-white font-bold'>Edit</button>
                            </div>
                    }
                    <button type='submit' onClick={() => { setAction('delete'); }} className='m-2 p-2 bg-red-600 rounded-md text-white font-bold' disabled={submitting}>Delete</button>
                </div>
                <div className='flex justify-center items-center col-span-2' aria-live="polite" aria-atomic="true">
                    {response && <p className="py-2 text-red-600">{response}</p>}
                    {response == 'Loading...' && <CircularProgress className='mx-4 max-w-6 max-h-6' />}
                </div>
            </div>
        </form>
    );
}
