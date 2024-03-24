'use client';

import { useFormState } from 'react-dom';
import { useRef, useState } from 'react';
import { redirect } from 'next/navigation';
import { addSchedules } from '@/app/lib/actions';
import { addDays, format } from 'date-fns';
import { QueryResultRow } from '@vercel/postgres';
import { CircularProgress } from '@mui/material';
import Map, { gymLocations } from '@/app/components/map';

export default function CreateSchedules({ scheduleData }: { scheduleData: QueryResultRow }) {
    const scheduleForm = useRef(null);
    const [date, setDate] = useState<string>('');
    const [chosenTimes, setChosenTimes] = useState<{ start: string, end: string }>({ start: '', end: '' });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [response, setResponse] = useState<string>();
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        const dispatch = await addSchedules(formData);
        setResponse(dispatch);

        const form = scheduleForm.current as unknown as HTMLFormElement;
        form.reset();
        setSubmitting(false);

        redirect('/schedules');
    }, undefined);

    return (
        <form ref={scheduleForm} action={dispatch} onSubmit={() => { setSubmitting(true); setResponse('Loading...') }}>
            <fieldset className='flex flex-col' disabled={submitting}>

                <h2 className='my-5 text-3xl text-red-600 font-bold'>Create New Schedule</h2>

                <label htmlFor='date' className='mt-2 px-2 text-red-600'>Date</label>
                <input type='date' name='date' id='date' min={format(addDays((new Date()), 3), 'yyyy-MM-dd')} onChange={(event) => { const date = event.target.value in scheduleData ? event.target.value : String(new Date(event.target.value).getDay()); setDate(date); setChosenTimes({ start: Object.keys(scheduleData[date])[0], end: (Object.values(scheduleData[date])[0] as string)[0] }); }} className='p-2 border-b-2' disabled={submitting} required />
                <label htmlFor='startTime' className='mt-2 px-2 text-red-600'>Start Time</label>
                <select id='startTime' name='startTime' value={chosenTimes.start} onChange={(event) => { setChosenTimes({ start: event.target.value, end: chosenTimes.end }); }} className='p-2 appearance-none border-b-2' required >
                    {scheduleData[date] ? Object.keys(scheduleData[date]).map((time, index) => (
                        <option key={`start_time_${index}`} value={time}>{time}</option>
                    )) : <option disabled value=''>No available times</option>}
                </select>
                <label htmlFor='endTime' className='mt-2 px-2 text-red-600'>End Time</label>
                <select id='endTime' name='endTime' value={chosenTimes.end} onChange={(event) => { setChosenTimes({ start: chosenTimes.start, end: event.target.value }); }} className='p-2 appearance-none border-b-2' required >
                    {(scheduleData[date] && scheduleData[date][chosenTimes.start]) ? (Object.values(scheduleData[date][chosenTimes.start]) as string[]).map((time, index) => (
                        <option key={`end_time_${index}`} value={time}>{time}</option>
                    )) : <option disabled value=''>No available times</option>}
                </select>
                <label htmlFor='address' className='mt-2 px-2 text-red-600'>Session Address</label>
                <input type='text' name='address' list='addressList' spellCheck={false} maxLength={95} placeholder='Enter your desired address' className='mb-2 p-2 border-b-2' required />
                <datalist id='addressList'>
                    {gymLocations && gymLocations.map((location, index) => (
                        <option value={location} key={`location_${index}`}>{`${location}`}</option>
                    ))}
                </datalist>
                
                <div className='p-10 grid place-items-center bg-gray-100'>
                    <div className='w-full h-full min-w-64 min-h-80 aspect-[5/3]'>
                        <Map />
                    </div>
                </div>

                <label htmlFor='comments' className='mt-2 px-2 text-red-600'>Comments</label>
                <textarea name='comments' id='comments' maxLength={95} placeholder='Enter any comments' className='mb-2 p-2 border-b-2' />

                <div className='flex items-center' aria-live="polite" aria-atomic="true">
                    {response && (<p className="py-4 text-red-600">{response}</p>)}
                    {response == 'Loading...' && <CircularProgress className='mx-4 max-w-6 max-h-6' />}
                </div>

                <button type='submit' className='my-5 p-5 text-white bg-red-600'>Submit</button>
            </fieldset>
        </form>
    );
}
