import InfoLayout from '@/app/ui/info-layout';
import ContactForm from '@/app/ui/contact-forms';
import Map from '@/app/ui/map';

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
