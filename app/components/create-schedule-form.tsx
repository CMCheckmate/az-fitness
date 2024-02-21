'use client';

import { useFormState } from 'react-dom';
import { useRef, useEffect, useState } from 'react';
import { generateStartTimes, addSchedules } from '@/app/lib/actions';
import { addDays, parse, format } from 'date-fns';
import { CircularProgress } from '@mui/material';

export default function CreateSchedules() {
    const scheduleForm = useRef(null);
    const startPicker = useRef(null);
    const endPicker = useRef(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [response, setResponse] = useState<string>();
    const [startTimes, setStartTimes] = useState<string[]>();
    const [endTimes, setEndTimes] = useState<string[]>();
    const [responseMessage, dispatch] = useFormState(async (state: string | undefined, formData: FormData) => {
        const dispatch = await addSchedules(state, formData);
        setResponse(dispatch);

        const form = scheduleForm.current as unknown as HTMLFormElement;
        form.reset();
        setStartTimes([]);
        setSubmitting(false);

        return dispatch;
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
        if (startTimes) {
            (startPicker.current as unknown as HTMLSelectElement).selectedIndex = 0;
            setEndTimes(generateEndTimes(startTimes[0]));
        }
    }, [startTimes])

    return (
        <form ref={scheduleForm} action={dispatch} onSubmit={() => { setSubmitting(true); setResponse('Loading...') }}>
            <fieldset className='flex flex-col' disabled={submitting}>

                <h2 className='my-5 text-3xl text-red-600 font-bold'>Enter New Schedule Details</h2>

                <label htmlFor='date' className='mt-2 px-2 text-red-600'>Date</label>
                <input type="date" name='date' id='date' min={format(addDays((new Date()), 3), 'yyyy-MM-dd')} onChange={async (event) => { setStartTimes(await generateStartTimes(event.target.value)); }} className='p-2 border-b-2' required />
                <label htmlFor='startTime' className='mt-2 px-2 text-red-600'>Start Time</label>
                <select ref={startPicker} id='startTime' name='startTime' onChange={(event) => { setEndTimes(generateEndTimes(event.target.value)); }} className='p-2 appearance-none border-b-2' required>
                    {startTimes ? startTimes.map((time, index) => (
                        <option key={`start_time${index}`} value={time}>{time}</option>
                    )) : <option disabled value=''>No available times</option>}
                </select>
                <label htmlFor='endTime' className='mt-2 px-2 text-red-600'>End Time</label>
                <select ref={endPicker} id='endTime' name='endTime' className='p-2 appearance-none border-b-2' required>
                    {endTimes ? endTimes.map((time, index) => (
                        <option key={`end_time${index}`} value={time}>{time}</option>
                    )) : <option disabled value=''>No available times</option>}
                </select>
                <label htmlFor='address' className='mt-2 px-2 text-red-600'>Session Address</label>
                <textarea name='address' id='address' spellCheck={false} maxLength={95} placeholder='Enter your desired address' className='mb-2 p-2 border-b-2' required />
                <label htmlFor='comments' className='mt-2 px-2 text-red-600'>Comments</label>
                <textarea name='comments' id='comments' placeholder='Enter any comments' className='mb-2 p-2 border-b-2' />

                <div className='flex items-center' aria-live="polite" aria-atomic="true">
                    {response && (<p className="py-4 text-red-600">{response}</p>)}
                    {response == 'Loading...' && <CircularProgress className='mx-4 max-w-6 max-h-6' />}
                </div>

                <button type='submit' className='my-5 p-5 text-white bg-red-600'>Submit</button>
            </fieldset>
        </form>
    );
}
