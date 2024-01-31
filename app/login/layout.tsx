import { inter } from '@/app/components/fonts';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${inter.className} antialiased`}>
            <div className='p-10 flex justify-center items-center bg-red-500'>
                <Link className='text-5xl text-white font-bold' href='/'>AZ-Fitness</Link>
            </div>

            <div className='flex justify-center items-center'>
                <Link className='p-5 text-xl font-bold underline' href='/'>Back to Home</Link>
            </div>

            <main>
                {children}
            </main>
        </div>
    );
}
