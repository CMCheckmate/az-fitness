import type { Metadata } from 'next';
import Link from 'next/link';
import { inter } from '@/app/ui/fonts';
import Navigation from '@/app/ui/navigation';
import Loader from '@/app/ui/loader'
import '@/app/ui/globals.css';

export const metadata: Metadata = {
    title: 'AZ-Fitness',
    description: 'Personal training service provider',
}

export default function InfoLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={`${inter.className} antialiased`}>
                <div className='mt-10 pb-2'>
                    <div className='shadow-lg'>
                        <div className='mx-44 py-5 flex items-end border-b-2 border-red-600'>
                            <h1 className='flex-1 text-5xl text-red-600 font-bold'>A to Z Fitness</h1>
                            <Link className='p-2 bg-blue-600 rounded-md text-white font-bold' href='/login'>Login/Signup</Link>
                        </div>
                        <div className='mx-72 p-5'>
                            <Navigation />
                        </div>
                    </div>
                </div>

                <main>
                    <Loader component={children} />
                </main>

                <div className='p-10 text-center'>
                    <h3 className='py-5 text-xl text-red-600 font-bold'>A to Z Fitness</h3>
                    <h4 className='text-red-600'>aran.ziegler@gmail.com</h4>
                    <h4 className='text-red-600'>022 017 0799</h4>
                    <p className='pt-10 text-red-600'>©2023 by AZ Fitness</p>
                </div>
            </body>
        </html>
    );
}
