import type { Metadata } from 'next';
import { inter } from '@/app/components/fonts';
import { auth } from '@/auth';
import Link from 'next/link';
import Navigation from '@/app/components/navigation';
import Loader from '@/app/components/loader';
import Sidebar from '@/app/components/sidebar';
import SignOut from '@/app/components/signout-button';

export const metadata: Metadata = {
    title: 'AZ-Fitness',
    description: 'Personal training service provider',
}

export default async function InfoLayout({ content }: { content: React.ReactNode }) {
    const session = await auth();
    
    return (
        <div className={`${inter.className} antialiased`}>
            <div className='pt-10 pb-2'>
                <div className=''>
                    <div className='mx-44 py-5 flex items-end border-b-2 border-red-600'>
                        <Link className='flex-1 text-5xl text-red-600 font-bold' href='/'>A to Z Fitness</Link>
                    </div>
                    
                    <Navigation />
                </div>
            </div>

            <Sidebar session={session} signOutButton={SignOut()}/>

            <main>
                <Loader component={content} />
            </main>

            <div className='p-10 text-center'>
                <h3 className='py-5 text-xl text-red-600 font-bold'>A to Z Fitness</h3>
                <h4 className='text-red-600'>aran.ziegler@gmail.com</h4>
                <h4 className='text-red-600'>022 017 0799</h4>
                <p className='pt-10 text-red-600'>©2023 by AZ Fitness</p>
            </div>
        </div>
    );
}
