import { inter } from '@/app/components/fonts';
import Link from 'next/link';
import Navigation from '@/app/components/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${inter.className} antialiased`}>
            <div className='p-10 flex justify-center items-center bg-red-500'>
                <Link className='max-w-full text-5xl text-white font-bold' href='/'>AZ-Fitness</Link>
            </div>
            
            <div>
                <Navigation />
            </div>

            <main>
                {children}
            </main>
        </div>
    );
}
