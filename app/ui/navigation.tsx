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
    ];
    const pathname = usePathname();

    return (
        <div className='grid grid-cols-5'>
            {links.map((link) => (
                <Link key={link['name']} className={`text-center text-xl ${pathname == link.href ? 'text-red-400' : 'text-red-600'} hover:text-red-400`} href={link.href}>{link.name}</Link>
            ))}
        </div>
    );
}
