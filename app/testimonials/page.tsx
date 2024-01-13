import Image from 'next/image';
import Loader from '@/app/loader'
import TestimonialDisplay from '@/app/ui/testimonials';
import womenRunning from '@/public/women_running.png';

function Testimonials() {
    return (
        <div>
            <TestimonialDisplay />
            
            <Image src={womenRunning} alt='Women Running' className='w-full aspect-[5/2] object-cover' />

            <div className='p-10 flex justify-center items-center bg-red-600'>
                <div className='w-1/2'>
                    <h2 className='m-10 text-center text-4xl text-white font-bold'>ADD A REVIEW</h2>
                    <h3 className='text-center text-xl text-white'>How Was Your Experience?</h3>
                    <form className='grid grid-cols-2'>
                        <input type="text" placeholder='First Name' className='m-5 p-5 border-b-2' required />

                        <input type="text" placeholder='Last Name' className='m-5 p-5 border-b-2' />

                        <input type="text" placeholder='Email' className='m-5 p-5 border-b-2' required />

                        <input type="text" placeholder='Phone' className='m-5 p-5 border-b-2' />

                        <input type="text" placeholder='Write your review here' className='col-span-2 m-5 p-5 border-b-2' required />

                        <p className='col-span-2 m-5 text-white'>Would you recommend us to your friends?</p>
                        <label htmlFor='Yes' className='mx-5'>
                            <input type='radio' name='recommend' id='Yes' value='Yes'/>
                            <span className='p-5 text-white'>Yes</span>
                        </label>

                        <label htmlFor='No' className='mx-5'>
                            <input type='radio' name='recommend' id='No' value='No' />
                            <span className='p-5 text-white'>No</span>
                        </label>

                        <input type="text" placeholder='Anything else you would like to add?' className='col-span-2 m-5 p-5 border-b-2' />

                        <div className='m-5 col-start-2 flex justify-end items-center'>
                            <button type='submit' className='p-5 w-1/2 text-red-600 bg-white'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function TestimonialPage() {
    return (
        <Loader component={Testimonials()} />
    );
}