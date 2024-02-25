import { Suspense } from 'react';
import { auth } from '@/auth';
import SignOut from '@/app/components/signout-button';
import Schedules, { SchedulesSkeleton } from '@/app/components/schedules';

export default async function SchedulePage() {
    const session = await auth();

    return (
        <div>
            <div className='m-5 p-2 flex items-center justify-center'>
                <h3 className='text-2xl font-bold'>{session ? `Logged In As: ${session.user?.name} (${session.user?.status})` : 'Problem with user session'}</h3>
                <div className='mx-5'>
                    <SignOut />
                </div>
            </div>

            <Suspense fallback={<SchedulesSkeleton />}>
                <Schedules session={session} />
            </Suspense>
        </div>
    );
}
