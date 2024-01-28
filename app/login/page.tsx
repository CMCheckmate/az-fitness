import { auth } from '@/auth';
import SignOut from '@/app/ui/signout-button';
import AccountForm from '@/app/ui/account-form';

export default async function LoginPage() {
    const session = await auth();

    return (
        <div className='p-10 flex justify-center items-center'>
            <div className='w-1/2 p-10 shadow-lg'>
                {
                    session?.user ? 
                        <div className='flex flex-col justify-center items-center'>
                            <h2 className='my-5 text-2xl font-bold'>{session ? `Logged In As: ${session?.user.name} (${session?.user.status})`: 'Problem with user session'}</h2>
                            <SignOut />
                        </div> :
                        <AccountForm />
                }
            </div>
        </div>
    );
};
