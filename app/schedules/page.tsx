import { signOut } from '@/auth';

export default function SchedulePage() {
    return (
        <div>
            <h2 className='m-20 text-center text-4xl text-red-600 font-bold'>Schedules</h2>
            <form action={async () => { 'use server'; await signOut(); }} className='flex items-center justify-center'>
                <button className='p-2 text-white font-bold rounded-md bg-gray-400'>Sign Out</button>
            </form>
        </div>
    );
}
