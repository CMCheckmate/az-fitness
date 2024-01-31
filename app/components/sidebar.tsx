'use client';

import { useRef, useState } from 'react';
import { Session } from 'next-auth';
import Link from 'next/link';

export default function SideBar({ session, signOutButton } : { session : Session | null, signOutButton : React.ReactNode }) {
    const barButton = useRef(null);
    const sidebar = useRef(null);
    const [animating, setAnimating] = useState<boolean>(false);
    const user = session?.user;

    function toggleSideBar() {
        const button = barButton.current as unknown as HTMLElement;
        const side = sidebar.current as unknown as HTMLElement;

        setAnimating(true);
        
        if (side.classList.contains('showSidebar')) {
            side.classList.remove('showSidebar');
            side.offsetHeight;
            side.classList.add('hideSidebar');

            button.classList.remove('showExit');
            button.offsetHeight;
            button.classList.add('showMenu');
        } else {
            side.classList.remove('hideSidebar');
            side.offsetHeight;
            side.classList.add('showSidebar');
        
            button.classList.remove('showMenu');
            button.offsetHeight;
            button.classList.add('showExit');
        }
    }

    return (
        <div>
            <div className='absolute top-0 right-0 z-20 p-12 flex justify-end items-center'>
                <button ref={barButton} onClick={toggleSideBar} className={`w-12 h-12 select-none bg-cover bg-[url('../../public/menu.png')]`} disabled={animating}/>
            </div>
            <div ref={sidebar} onAnimationEnd={() => { setAnimating(false); }} className='absolute top-0 right-0 translate-x-full z-10 w-min h-3/4 p-12 pt-24 bg-red-600 shadow-xl'>
                <div className='py-10 grid grid-rows-2'>
                    <div className='flex justify-end items-center'>
                        <Link className='w-min my-5 p-2 text-2xl text-white font-bold underline' href='/schedules'>Schedules</Link>
                    </div>
                    <div className='flex justify-end items-center'>
                        {
                            user ? 
                            <div className='flex flex-col justify-center items-end'>
                                <p className='py-2 text-white'>
                                    {user.name}
                                </p>
                                <div className='my-2'>
                                    {signOutButton}
                                </div>
                            </div> :
                            <Link className='w-min my-5 p-2 bg-gray-400 rounded-md text-white font-bold' href='/login'>Login/Signup</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
