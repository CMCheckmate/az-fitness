import { Suspense } from 'react';
import { auth } from '@/auth';
import SignOut from '@/app/components/signout-button';
import Schedules, { SchedulesSkeleton } from '@/app/components/schedules';
import ScheduleLayout from '../components/schedule-layout';
import { Session } from 'next-auth';

function Schedule(session: Session | null) {
    return (
        <div className='pt-10'>
            <div className='mx-10 flex justify-center items-center'>
                <div className='md:w-3/4 flex justify-end items-center'>
                    <div className='flex flex-wrap justify-center items-center'>
                        <h3 className='mr-5 text-xl font-bold'>{session ? `${session.user?.status}: ${session.user?.name}` : 'Problem with user session'}</h3>
                        <SignOut />
                    </div>
                </div>
            </div>
            <h2 className='p-5 text-4xl text-center text-red-600 font-bold'>Schedules</h2>

            <Suspense fallback={<SchedulesSkeleton />}>
                <Schedules session={session} />
            </Suspense>
        </div>
    );
}

export default async function SchedulePage() {
    const session = await auth();

    return (
        <ScheduleLayout content={Schedule(session)} />
    )
}
