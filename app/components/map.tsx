export default function Map() {
    const center = { lat: -36.7167, lng: 174.7000 };

    return (
        <iframe src={`https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d12793.001942742867!2d${center.lng}!3d${center.lat}!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDQzJzAwLjEiUyAxNzTCsDQyJzAwLjAiRQ!5e0!3m2!1sen!2sus!4v1705162423356!5m2!1sen!2sus`} loading='lazy' referrerPolicy='no-referrer-when-downgrade' className='w-full aspect-[5/2]'></iframe>
    );
}
