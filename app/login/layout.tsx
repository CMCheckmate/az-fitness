import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className='p-10 flex justify-center items-center bg-red-500'>
                <Link className='text-5xl text-white font-bold' href='/'>AZ-Fitness</Link>
            </div>

            {children}
        </div>
    );
}
