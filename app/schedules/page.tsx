import { auth } from '@/auth';
import { getSchedules } from '@/app/lib/actions';
import CreateSchedules from '@/app/ui/create-schedule-form';
import EditSchedules from '@/app/ui/edit-schedule-form';
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

                <div className='table'>
                    <div className='table-header-group border-2'>
                        <div className='table-row bg-red-600'>
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>Session Number</div>
                            {session?.user.status == 'administrator' && <div className='table-cell text-center p-2 border-2 text-l text-white font-bold'>Name</div>}
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>Date</div>
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>Time</div>
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>Length (hours)</div>
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>Comments</div>
                            <div className='table-cell p-2 border-2 text-center text-l text-white font-bold'>Action</div>
                        </div>
                    </div>

                    <div className='table-row-group border-2'>
                        {schedules.map((schedule, index) => (
                            <EditSchedules key={`row${index + 1}`} data={{...schedule, 'number': index + 1}} className={`${index % 2 != 0 && 'bg-gray-300'}`} />
                        ))}
                    </div>
                </div>
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
