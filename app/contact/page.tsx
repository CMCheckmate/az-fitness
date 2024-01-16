import Loader from '@/app/ui/loader'
import Map from '@/app/ui/map'

function Contact() {
    return (
        <div>
            <div className='p-10 flex justify-center items-center'>
                <div className='w-1/2'>
                    <h2 className='text-center text-4xl text-red-600 font-bold'>CONTACT ME</h2>
                    <form className='flex flex-col'>
                        <label htmlFor='name' className='mt-2 px-2 text-red-600'>Name *</label>
                        <input type='text' id='name' placeholder='Enter your name' className='p-2 border-b-2' required />
                        <label htmlFor='email' className='mt-2 px-2 text-red-600'>Email *</label>
                        <input type='text' id='email' placeholder='Enter your email' className='p-2 border-b-2' required />
                        <label htmlFor='subject' className='mt-2 px-2 text-red-600'>Subject</label>
                        <input type='text' id='subject' placeholder='Type the Subject' className='p-2 border-b-2' />
                        <label htmlFor='message' className='mt-2 px-2 text-red-600'>Message</label>
                        <input type='text' id='message' placeholder='Type your message here...' className='p-2 border-b-2' required />

                        <button type='submit' className='my-5 p-5 text-white bg-red-600'>Submit</button>
                    </form>
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
        <Loader component={Contact()} />
    );
}
