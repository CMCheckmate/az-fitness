import { Session } from 'next-auth';
import { addMinutes, parse, format } from 'date-fns';
import { getSchedules, getExcludedTimes } from '@/app/lib/actions';
import CreateSchedules from '@/app/components/create-schedule-form';
import EditSchedules from '@/app/components/edit-schedule-form';

export function SchedulesSkeleton() {
    return (
        <div>
            <div className='m-5 flex flex-col items-center justify-center'>
                <h2 className='p-5 text-center text-4xl text-red-600 font-bold'>Schedules</h2>

                <table className='border-2'>
                    <thead className='border-2'>
                        <tr className='divide-x-2 bg-red-600'>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>Session Number</th>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>Date</th>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>Start Time</th>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>End Time</th>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>Session Address</th>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>Comments</th>
                            <th className='table-cell p-2 text-center text-l text-white font-bold'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='border-2'>
                        <tr className='p-2 text-center divide-x-2'>
                            <td className='p-4'></td>
                            <td className='p-4'></td>
                            <td className='p-4'></td>
                            <td className='p-4'></td>
                            <td className='p-4'></td>
                            <td className='p-4'></td>
                            <td className='p-4'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default async function Schedules({ session }: { session: Session | null }) {
    interface StartTimes {
        [key: string]: string[]
    };
    interface ScheduleTimes {
        [key: string]: StartTimes
    };

    const excludedDayTimes = {
        1: { start: '06:00', end: '21:00', excluded: [] },
        2: { start: '06:00', end: '21:00', excluded: [{ start: '13:30', end: '16:00' }] },
        3: { start: '06:00', end: '18:00', excluded: [{ start: '13:30', end: '16:00' }] },
        4: { start: '06:00', end: '21:00', excluded: [{ start: '11:30', end: '15:00' }] },
        5: { start: '06:00', end: '21:00', excluded: [] },
        6: { start: '06:00', end: '21:00', excluded: [] },
        0: { start: '06:00', end: '21:00', excluded: [] }
    } as { [key: number]: { start: string, end: string, excluded: { start: string, end: string }[] } };
    const scheduleInterval = 30;
    const maxScheduleLength = 120;
    const schedules = await getSchedules(session?.user);
    const scheduleTimes = await getScheduleTimes();

    async function getScheduleTimes() {
        const startTimes = {} as StartTimes;
        const scheduleTimes = {} as ScheduleTimes;

        for (const [date, exclusions] of Object.entries(Object.assign(await getExcludedTimes(), excludedDayTimes))) {
            const day = /^[0-6]+$/.test(date) ? Number(date) : parse(date, 'yyyy-MM-dd', new Date()).getDay();
            const startTime = parse(excludedDayTimes[day].start, 'HH:mm', new Date());

            if (!startTimes[date]) {
                startTimes[date] = [];
            }
            while (format(startTime, 'HH:mm') <= excludedDayTimes[day].end) {
                const time = format(startTime, 'HH:mm');
                const exclusionList = 'excluded' in exclusions ? exclusions.excluded as [] : exclusions.concat(excludedDayTimes[day].excluded);

                for (const exclusion of exclusionList) {
                    if (format(addMinutes(startTime, scheduleInterval), 'HH:mm') >= exclusion.start && time <= exclusion.end) {
                        startTime.setMinutes(startTime.getMinutes() + scheduleInterval);
                        break;
                    }
                }
                if (format(startTime, 'HH:mm') == time) {
                    startTimes[date].push(format(startTime, 'hh:mm a'));
                    startTime.setMinutes(startTime.getMinutes() + scheduleInterval);
                }
            }
        }
        for (const [date, times] of Object.entries(startTimes)) {
            const day = /^[0-6]+$/.test(date) ? Number(date) : parse(date, 'yyyy-MM-dd', new Date()).getDay();

            scheduleTimes[date] = {};
            for (const startTime of times) {
                scheduleTimes[date][startTime] = getEndTimes(startTime, day, startTimes[date]);
            }
        }
        return scheduleTimes;
    }

    function getEndTimes(startTime: string, day: number, startTimes: string[]) {
        const endTimes = [];
        const time = parse(startTime, 'hh:mm a', new Date());

        while (endTimes.length < maxScheduleLength / scheduleInterval) {
            time.setMinutes(time.getMinutes() + scheduleInterval);

            const endTime = format(time, 'hh:mm a');

            endTimes.push(endTime);
            if (!startTimes.includes(endTime) && format(time, 'HH:mm') <= excludedDayTimes[day].end) {
                break;
            }
        }
        return endTimes;
    }

    function getSpecificSchedules(schedule: ScheduleTimes, date: string, start: string, end: string) {
        const specificTimes = [];
        const day = parse(date, 'yyyy-MM-dd', new Date()).getDay();
        const startTime = parse(start, 'hh:mm a', new Date());
        const startingTime = format(startTime, 'HH:mm');
        const endingTime = format(parse(end, 'hh:mm a', new Date()), 'HH:mm');

        if (startingTime != excludedDayTimes[day].start) {
            startTime.setMinutes(startTime.getMinutes() - scheduleInterval);
        }
        while (format(startTime, 'HH:mm') <= endingTime) {
            specificTimes.push(format(startTime, 'hh:mm a'));
            startTime.setMinutes(startTime.getMinutes() + scheduleInterval);
        }

        const updatedSchedule = {} as StartTimes;
        const specificSchedule = { ...schedule } as ScheduleTimes;
        const startTimes = Object.keys(specificSchedule[date]);
        const updatedStartTimes = startTimes.concat(specificTimes);

        for (const [time, endTimes] of Object.entries(specificSchedule[date])) {
            const startTime = parse(time, 'hh:mm a', new Date());
            const starterTime = format(startTime, 'HH:mm');

            if (!updatedSchedule[end] && (starterTime > startingTime) || time == startTimes[startTimes.length - 1]) {
                if (time == startTimes[startTimes.length - 1]) {
                    updatedSchedule[time] = endTimes;
                }
                for (const time of specificTimes) {
                    if (format(parse(time, 'hh:mm a', new Date()), 'HH:mm') <= excludedDayTimes[day].end) {
                        updatedSchedule[time] = getEndTimes(time, day, updatedStartTimes);
                    }
                }
            }
            if (starterTime < startingTime && format(addMinutes(startTime, scheduleInterval), 'HH:mm') >= startingTime) {
                endTimes.concat(getEndTimes(endTimes[endTimes.length - 1], day, updatedStartTimes));
            }
            if (!updatedSchedule[time]) {
                updatedSchedule[time] = endTimes;
            }
        }
        specificSchedule[date] = updatedSchedule;
        return specificSchedule;
    }

    return (
        <div>
            <div className='m-5 flex flex-col items-center justify-center'>
                <h2 className='p-5 text-center text-4xl text-red-600 font-bold'>Schedules</h2>

                <div className='table border-2'>
                    <div className='table-header-group'>
                        <div className='table-row divide-x-2 bg-red-600'>
                            <div className='table-cell p-2 text-center text-l text-white font-bold'>Session Number</div>
                            {session?.user.status == 'administrator' && <div className='table-cell text-center p-2 text-l text-white font-bold'>Name</div>}
                            <div className='table-cell p-2 text-center text-l text-white font-bold'>Date</div>
                            <div className='table-cell p-2 text-center text-l text-white font-bold'>Start Time</div>
                            <div className='table-cell p-2 text-center text-l text-white font-bold'>End Time</div>
                            <div className='table-cell p-2 text-center text-l text-white font-bold'>Session Address</div>
                            <div className='table-cell p-2 text-center text-l text-white font-bold'>Comments</div>
                            <div className='table-cell p-2 text-center text-l text-white font-bold'>Action</div>
                        </div>
                    </div>

                    <div className='table-row-group'>
                        {schedules && schedules.map((schedule, index) => (
                            <EditSchedules key={`row_${index + 1}`} data={{ ...schedule, number: index + 1, schedules: getSpecificSchedules(scheduleTimes, schedule.date, schedule.start_time, schedule.end_time) }} className={`${index % 2 != 0 && 'bg-gray-300'}`} />
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
