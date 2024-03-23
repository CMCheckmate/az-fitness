import { auth } from '@/auth';
import SignOut from '@/app/components/signout-button';
import AccountForm from '@/app/components/account-form';
import ScheduleLayout from '@/app/components/schedule-layout';
import { Session } from 'next-auth';

function Login(session: Session | null ) {
    return (
        <div className='p-5 grid place-items-center overflow-auto'>
            <div className='w-1/2 min-w-min shadow-lg'>
                {
                    session?.user ? 
                        <div className='p-5 flex flex-col justify-center items-center'>
                            <h2 className='my-5 text-2xl font-bold'>{session ? `Logged In As: ${session?.user.name} (${session?.user.status})`: 'Problem with user session'}</h2>
                            <SignOut />
                        </div> :
                        <AccountForm />
                }
            </div>
        </div>
    );
};

export default async function LoginPage() {
    const session = await auth();

    return (
        <ScheduleLayout content={Login(session)} />
    )
}
