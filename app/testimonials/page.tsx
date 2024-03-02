import Image from 'next/image';
import InfoLayout from '@/app/components/info-layout'
import TestimonialDisplay from '@/app/components/testimonials';
import womenRunning from '@/public/women_running.png';
import TestimonialForm from '@/app/components/review-form';

function Testimonials() {
    return (
        <div>
            <TestimonialDisplay />
            
            <Image src={womenRunning} alt='Women Running' className='w-full aspect-[5/2] object-cover' />

            <div className='p-10 flex justify-center items-center bg-red-600'>
                <div className='w-1/2 min-w-min'>
                    <h2 className='m-10 text-center text-4xl text-white font-bold'>ADD A REVIEW</h2>
                    
                    <TestimonialForm />
                </div>
            </div>
        </div>
    );
}

export default function TestimonialPage() {
    return (
        <InfoLayout content={Testimonials()} />
    );
}