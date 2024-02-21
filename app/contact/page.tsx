import Image from 'next/image';
import Link from 'next/link';
import InfoLayout from '@/app/components/info-layout';
import ContactForm from '@/app/components/contact-form';
import Map from '@/app/components/map';
import instagram from '@/public/instagram.png';
import onlyFans from '@/public/only_fans.png';
import facebook from '@/public/facebook.png';
import twitterX from '@/public/twitter_x.png';

function Contact() {
    return (
        <div>
            <div className='p-10 flex justify-center items-center'>
                <div className='w-1/2'>
                    <ContactForm />
                </div>
            </div>

            <div className='p-10 flex flex-col justify-center items-center bg-red-600'>
                <h2 className='text-4xl text-white font-bold'>SOCIALS</h2>
                <div className='p-10 grid grid-cols-4'>
                    <Link href={'https://www.instagram.com/sorrylibrary/'} className='mx-10 flex justify-center items-center text-white hover:text-red-200'>
                        <Image src={instagram} alt='Instagram' className='w-min object-cover' />
                        <h3 className='text-xl font-bold'>Instagram</h3>
                    </Link>
                    <Link href={'https://onlyfans.com/azfitness'} className='mx-10 flex justify-center items-center text-white hover:text-red-200'>
                        <Image src={onlyFans} alt='Only Fans' className='w-min object-cover' />
                        <h3 className='text-xl font-bold'>Only Fans</h3>
                    </Link>
                    <Link href={'https://www.facebook.com/people/AZ-Fitness/61556892410672/'} className='mx-10 flex justify-center items-center text-white hover:text-red-200'>
                        <Image src={facebook} alt='Facebook' className='w-min object-cover' />
                        <h3 className='text-xl font-bold'>Facebook</h3>
                    </Link>
                    <Link href={'https://twitter.com/timelord2003'} className='mx-10 flex justify-center items-center text-white hover:text-red-200'>
                        <Image src={twitterX} alt='Twitter' className='w-min object-cover' />
                        <h3 className='text-xl font-bold'>Twitter</h3>
                    </Link>
                </div>
            </div>

            <div className='flex justify-center items-center'>
                <Map />
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <InfoLayout content={Contact()} />
    );
}
