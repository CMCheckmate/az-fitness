import InfoLayout from '@/app/components/info-layout';
import ContactForm from '@/app/components/contact-forms';
import Map from '@/app/components/map';

function Contact() {
    return (
        <div>
            <div className='p-10 flex justify-center items-center'>
                <div className='w-1/2'>
                    <ContactForm />
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
