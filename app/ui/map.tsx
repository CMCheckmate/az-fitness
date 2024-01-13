export default function Map() {
    const center = { lat: -36.7167, lng: 174.7000 };

    return (
        <iframe src={`http://maps.google.com/maps?q=${center.lat},${center.lng}&z=15&output=embed`} className='w-full aspect-[5/2]'></iframe>
    );
}
