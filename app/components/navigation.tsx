'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
    const links = [
        { 'name': 'Home', 'href': '/' }, 
        { 'name': 'Testimonials', 'href': '/testimonials' },
        { 'name': 'Tips & Advice', 'href': '/tips-&-advice' },
        { 'name': 'Contact', 'href': '/contact' },
        { 'name': 'FAQ', 'href': '/faq' }, 
        { 'name': 'Schedules', 'href': '/schedules' }
    ];
    const pathname = usePathname();

    return (
        <div className='p-5 px-72 shadow-lg'>
            < div className = 'flex justify-center items-center' >
            {
                links.map((link) => (
                    <Link key={link['name']} className={`px-5 text-center text-xl ${pathname == link.href ? 'text-red-400' : 'text-red-600'} hover:text-red-400`} href={link.href}>{link.name}</Link>
                ))
            }
            </div >
        </div>
    );
}
