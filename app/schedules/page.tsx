import { use } from 'react';
import { auth } from '@/auth';
import { getSchedules, getExcludedTimes } from '@/app/lib/actions';
import { subMinutes, parse, format } from 'date-fns';
import CreateSchedules from '@/app/components/create-schedule-form';
import EditSchedules from '@/app/components/edit-schedule-form';
import SignOut from '@/app/components/signout-button';

export default async function SchedulePage() {
    const session = await auth();
    const schedules = await getSchedules(session?.user);
    const scheduleTimes = await getScheduleTimes();

    async function getScheduleTimes(
        interval: number = 30,
        dayExclusions: { [key: number]: { start: string, end: string, excluded: { start: string, end: string }[] } } = {
            1: { start: '06:00', end: '21:00', excluded: [] },
            2: { start: '06:00', end: '21:00', excluded: [{ start: '13:00', end: '16:00' }] },
            3: { start: '06:00', end: '18:00', excluded: [{ start: '13:00', end: '16:00' }] },
            4: { start: '06:00', end: '21:00', excluded: [{ start: '11:00', end: '15:00' }] },
            5: { start: '06:00', end: '21:00', excluded: [] },
            6: { start: '06:00', end: '21:00', excluded: [] },
            0: { start: '06:00', end: '21:00', excluded: [] }
        },
        maxScheduleTime: number = 120
    ) {
        interface OptionTimes {
            [key: string]: string[]
        }
        interface ScheduleTimes {
            [key: string]: OptionTimes
        }
        const startTimes = {} as OptionTimes;
        for (const [date, exclusions] of Object.entries(Object.assign(await getExcludedTimes(), dayExclusions))) {
            if (!startTimes[date]) {
                startTimes[date] = [];
            }
            const day = /^\d+$/.test(date) ? Number(date) : parse(date, 'yyyy-MM-dd', new Date()).getDay();
            const time = new Date(0);
            time.setHours(parse(dayExclusions[day].start, 'HH:mm', new Date()).getHours());
            while (format(time, 'HH:mm') <= dayExclusions[day].end) {
                const initialTime = format(time, 'HH:mm');
                const exclusionList = 'excluded' in exclusions ? exclusions.excluded as { start: string; end: string; }[] : exclusions.concat(dayExclusions[day].excluded); 
                for (const exclusion of exclusionList) {
                    if (initialTime >= format(subMinutes(parse(exclusion.start, 'HH:mm', new Date()), interval), 'HH:mm') && initialTime <= exclusion.end) {
                        time.setMinutes(time.getMinutes() + interval);
                        break;
                    }
                }
                if (initialTime == format(time, 'HH:mm')) {
                    startTimes[date].push(format(time, 'hh:mm a'));
                    time.setMinutes(time.getMinutes() + interval);
                }
            }
        }
        const scheduleTimes = {} as ScheduleTimes;
        for (const [date, times] of Object.entries(startTimes)) {
            scheduleTimes[date] = {};
            for (const time of times) {
                scheduleTimes[date][time] = [];
                const initialTime = parse(time, 'hh:mm a', new Date());
                while (scheduleTimes[date][time].length < maxScheduleTime / interval) {
                    initialTime.setMinutes(initialTime.getMinutes() + interval);
                    const currentTime = format(initialTime, 'hh:mm a');
                    scheduleTimes[date][time].push(currentTime);
                    if (!startTimes[date].includes(currentTime)) {
                        break;
                    }
                }
            }
        }
        return scheduleTimes;
    }

    return (
        <div>
            <div className='m-5 p-2 flex items-center justify-center'>
                <h3 className='text-2xl font-bold'>{session ? `Logged In As: ${session.user?.name} (${session.user?.status})` : 'Problem with user session'}</h3>
                <div className='mx-5'>
                    <SignOut />
                </div>
            </div>

            <div className='m-5 flex flex-col items-center justify-center'>
                <h2 className='p-5 text-center text-4xl text-red-600 font-bold'>Schedules</h2>

                {/* <table className='border-2'>
                    <thead className='border-2'>
                        <tr className='divide-x-2 bg-red-600'>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>Session Number</th>
                            {session?.user.status == 'administrator' && <th className='table-cell text-center p-2 border-2 text-l text-white font-bold'>Name</th>}
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>Date</th>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>Start Time</th>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>End Time</th>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>Session Address</th>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>Comments</th>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='border-2'>
                        {schedules && schedules.map((schedule, index) => (
                            <tr key={`schedule_${index}`} className={`${index % 2 != 0 && 'bg-gray-300'} divide-x-2 text-red-400 font-bold`}>
                                <td className='text-center'>
                                    {index + 1}
                                </td>
                                <td className='p-4 text-center'>
                                    {format(schedule.start_time, 'dd/MM/yyyy')}
                                </td>
                                <td className='p-4 text-center'>
                                    {format(schedule.start_time, 'hh:mm a')}
                                </td>
                                <td className='p-4 text-center'>
                                    {format(schedule.end_time, 'hh:mm a')}
                                </td>
                                <td className='w-max-64 p-4 text-center'>
                                    {schedule.address}
                                </td>
                                <td className='w-max-64 p-4 text-center'>
                                    {schedule.comments}
                                </td>
                                <td>
                                    <button type='button' className='m-2 p-2 bg-blue-600 rounded-md text-white font-bold'>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}

                <div className='table'>
                    <div className='table-header-group border-2'>
                        <div className='table-row bg-red-600'>
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>Session Number</div>
                            {session?.user.status == 'administrator' && <div className='table-cell text-center p-2 border-2 text-l text-white font-bold'>Name</div>}
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>Date</div>
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>Start Time</div>
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>End Time</div>
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>Session Address</div>
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>Comments</div>
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>Action</div>
                        </div>
                    </div>

                    <div className='table-row-group border-2'>
                        {schedules && schedules.map((schedule, index) => (
                            <EditSchedules key={`row_${index + 1}`} data={{...schedule, number: index + 1, schedules: scheduleTimes }} className={`${index % 2 != 0 && 'bg-gray-300'}`} />
                        ))}
                    </div>
                </div>
            </div>

            {
                session?.user.status == 'member' && 
                <div className='m-5 flex justify-center items-center'>
                    <div className='w-1/2 p-10 shadow-lg'>
                        <CreateSchedules scheduleData={scheduleTimes} />
                    </div>
                </div>
            }
        </div>
    );
}
