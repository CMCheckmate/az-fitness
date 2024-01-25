import { signOut } from '@/auth';

export default function SignOut() {
    return (
        <form action={async () => { 'use server'; await signOut(); }} className='m-5 flex items-center justify-center'>
            <button className='p-2 text-white font-bold rounded-md bg-gray-400'>Sign Out</button>
        </form>
    );
}
