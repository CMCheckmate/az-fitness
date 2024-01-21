import { signOut } from '@/auth';

export default function SchedulePage() {
    const data = [
        {
            'name': 'Sussy Baka',
            'date': '01/04/2024',
            'time': '6:00',
            'length': '1',
            'comments': '',
        },
        {
            'name': 'Mike Oxlong',
            'date': '06/06/2024',
            'time': '6:09',
            'length': '69',
            'comments': '69 baby!',
        },
        {
            'name': 'Ming Ray Goy',
            'date': '01/01/2024',
            'time': '14:00',
            'length': '0.5',
            'comments': 'Leg Day :T',
        }
    ];

    return (
        <div>
            <h2 className='m-10 text-center text-4xl text-red-600 font-bold'>Schedules</h2>

            <div className='flex items-center justify-center'>
                <table>
                    <thead>
                        <tr className='bg-red-600'>
                            <th className='p-2 border-2 text-l text-white font-bold'>Session Number</th>
                            <th className='p-2 border-2 text-l text-white font-bold'>Name</th>
                            <th className='p-2 border-2 text-l text-white font-bold'>Date</th>
                            <th className='p-2 border-2 text-l text-white font-bold'>Time</th>
                            <th className='p-2 border-2 text-l text-white font-bold'>Length (hours)</th>
                            <th className='p-2 border-2 text-l text-white font-bold'>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => (
                            <tr key={`row${index + 1}`} className={`text-red-400 ${index % 2 != 0 ? 'bg-gray-300' : ''} font-bold`}>
                                <td className='p-2 border-2'>{index + 1}</td>
                                <td className='p-2 border-2'>{element.name}</td>
                                <td className='p-2 border-2'>{element.date}</td>
                                <td className='p-2 border-2'>{element.time}</td>
                                <td className='p-2 border-2'>{element.length}</td>
                                <td className='p-2 border-2'>{element.comments}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <form action={async () => { 'use server'; await signOut(); }} className='m-5 flex items-center justify-center'>
                <button className='p-2 text-white font-bold rounded-md bg-gray-400'>Sign Out</button>
            </form>
        </div>
    );
}
