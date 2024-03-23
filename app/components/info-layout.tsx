import type { Metadata } from 'next';
import { inter } from '@/app/components/fonts';
import { auth } from '@/auth';
import Link from 'next/link';
import Navigation from '@/app/components/navigation';
import Loader from '@/app/components/loader';
import ProfileBar from '@/app/components/profile-bar';

export const metadata: Metadata = {
    title: 'AZ-Fitness',
    description: 'Personal training service provider',
}

export default async function InfoLayout({ content }: { content: React.ReactNode }) {
    const session = await auth();
    
    return (
        <div className={`${inter.className} antialiased`}>
            <div className='py-2 flex flex-col justify-center items-center'>
                <div className='w-3/4 m-10 mb-0 p-2 flex flex-wrap justify-end items-center border-b-2 border-red-600'>
                    <Link className='max-w-full flex-1 text-5xl text-red-600 font-bold' href='/'>A to Z Fitness</Link>
                    
                    <ProfileBar session={session} />
                </div>
                
                <Navigation />
            </div>

            <main>
                <Loader component={content} />
            </main>

            <div className='p-10 flex flex-col justify-center items-center text-center'>
                <Link href={'/'} className='py-5 text-xl text-red-600 font-bold hover:underline'>A to Z Fitness</Link>
                <Link href={'mailto:aran.ziegler@gmail.com'} className='text-red-600 italic hover:underline'>aran.ziegler@gmail.com</Link>
                <Link href={'tel:+64284357966'} className='text-red-600 hover:underline'>022-017-0799</Link>
                <p className='pt-10 text-red-600'>©2023 by AZ Fitness</p>
            </div>
        </div>
    );
}
