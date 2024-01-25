import { auth } from '@/auth';
import { getSchedules } from '@/app/lib/actions';
import CreateSchedules from '@/app/ui/create-schedule-form';
import SignOut from '@/app/ui/signout-button';

export default async function SchedulePage() {
    const session = await auth();
    const schedules = await getSchedules(session?.user);

    return (
        <div>
            <div className='m-5 p-2 flex items-center justify-center'>
                <h3 className='text-2xl font-bold'>{session ? `Logged in as: ${session.user?.name} (${session.user?.status})` : 'Not Logged in'}</h3>
            </div>

            <div className='m-5 flex flex-col items-center justify-center'>
                <h2 className='p-10 text-center text-4xl text-red-600 font-bold'>Schedules</h2>

                <table>
                    <thead>
                        <tr className='bg-red-600'>
                            <th className='p-2 border-2 text-l text-white font-bold'>Session Number</th>
                            {session?.user.status == 'administrator' && <th className='p-2 border-2 text-l text-white font-bold'>Name</th>}
                            <th className='p-2 border-2 text-l text-white font-bold'>Date</th>
                            <th className='p-2 border-2 text-l text-white font-bold'>Time</th>
                            <th className='p-2 border-2 text-l text-white font-bold'>Length (hours)</th>
                            <th className='p-2 border-2 text-l text-white font-bold'>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule, index) => (
                            <tr key={`row${index + 1}`} className={`text-red-400 ${index % 2 != 0 ? 'bg-gray-300' : ''} font-bold`}>
                                <td className='p-2 border-2'>{index + 1}</td>
                                {'name' in schedule && <td className='p-2 border-2'>{schedule.name}</td>}
                                <td className='p-2 border-2'>{schedule.date_time.toLocaleDateString()}</td>
                                <td className='p-2 border-2'>{schedule.date_time.toLocaleTimeString()}</td>
                                <td className='p-2 border-2'>{schedule.length}</td>
                                <td className='p-2 border-2'>{schedule.comments}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {
                session?.user.status == 'member' && 
                <div className='m-5 flex justify-center items-center'>
                    <div className='w-1/2 p-10 shadow-lg'>
                        <CreateSchedules />
                    </div>
                </div>
            }
            
            <div className='m-5'>
                <SignOut />
            </div>
        </div>
    );
}
