import Image from 'next/image';
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
            <div className='p-10 flex justify-center items-center overflow-auto'>
                <div className='w-1/2 min-w-min shadow-xl'>
                    <ContactForm />
                </div>
            </div>

            <div className='p-10 py-32 bg-red-600 text-center'>
                <h2 className='text-4xl text-white font-bold'>SOCIALS</h2>
                <div className='flex flex-wrap justify-center items-center'>
                    <a target='_blank' href={'https://www.instagram.com/sorrylibrary/'} className='max-w-full m-10 flex justify-center items-center text-white hover:text-gray-300 hover:underline'>
                        <Image src={instagram} alt='Instagram' className='min-w-16 object-cover' />
                        <h3 className='max-w-full text-xl font-bold'>Instagram</h3>
                    </a>
                    <a target='_blank' href={'https://www.facebook.com/people/AZ-Fitness/61556892410672/'} className='max-w-full m-10 flex justify-center items-center text-white hover:text-gray-300 hover:underline'>
                        <Image src={facebook} alt='Facebook' className='min-w-16 object-cover' />
                        <h3 className='max-w-full text-xl font-bold'>Facebook</h3>
                    </a>
                    <a target='_blank' href={'https://twitter.com/timelord2003'} className='max-w-full m-5 flex justify-center items-center text-white hover:text-gray-300 hover:underline'>
                        <Image src={twitterX} alt='Twitter' className='min-w-16 object-cover' />
                        <h3 className='text-xl font-bold'>Twitter</h3>
                    </a>
                    <a target='_blank' href={'https://onlyfans.com/azfitness'} className='max-w-full m-10 flex justify-center items-center text-white hover:text-gray-300 hover:underline'>
                        <Image src={onlyFans} alt='Only Fans' className='min-w-16 object-cover' />
                        <h3 className='max-w-full text-xl font-bold'>Only Fans</h3>
                    </a>
                </div>
            </div>

            <div className='p-10 grid place-items-center bg-gray-100 overflow-auto'>
                <h2 className='m-5 text-4xl text-red-600 font-bold'>GYM CENTERS</h2>
                <div className='w-3/4 h-full min-w-64 min-h-80 aspect-[5/3]'>
                    <Map />
                </div>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <InfoLayout content={Contact()} />
    );
}
