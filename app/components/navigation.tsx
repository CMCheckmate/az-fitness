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
        <div className='w-full p-5 shadow-lg'>
            < div className = 'flex flex-wrap justify-center items-center' >
            {
                links.map((link) => (
                    pathname != link.href && <Link key={link['name']} className={`px-5 text-center text-xl text-red-600 hover:text-red-400`} href={link.href}>{link.name}</Link>
                ))
            }
            </div >
        </div>
    );
}
