'use client';

import { useRef } from 'react';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import profile from '@/public/account.png';

export default function ProfileBar({ session, signOutButton } : { session : Session | null, signOutButton : React.ReactNode }) {
    const profileBar = useRef(null);
    
    function toggleProfile() {
        const bar = profileBar.current as unknown as HTMLElement;
        if (bar.style.display == 'block') {
            bar.style.display = 'none';
        } else {
            bar.style.display = 'block';
        }
    }
    
    return (
        <div className='relative'>
            <Image src={profile} alt='Profile' onClick={toggleProfile} className='max-w-16 max-h-16 object-cover' />
            <div ref={profileBar} className='absolute right-0 z-50 hidden'>
                <div className='py-2 flex flex-col justify-center items-end'>
                    <div className='w-0 h-0 mr-3 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-solid border-red-600'></div>
                    <div className='p-5 flex flex-col justify-end items-center rounded-md bg-red-600'>
                        {
                            session && session.user ?
                                <div className='my-5 flex flex-col justify-center items-end'>
                                    <p className='py-2 text-right text-white text-xl'>
                                        {session.user.name}
                                    </p>
                                    <div className='my-2'>
                                        {signOutButton}
                                    </div>
                                </div> :
                                <div className='my-5 flex flex-col justify-center items-end'>
                                    <h2 className='py-2 text-2xl text-white font-bold'>Account</h2>
                                    <Link className='w-min p-2 bg-gray-400 rounded-md text-white font-bold' href='/login'>Login/Signup</Link>
                                </div>
                        }
                        <Link className='w-min my-5 p-2 text-2xl text-white font-bold hover:text-gray-200 hover:underline' href='/schedules'>Schedules</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// export default function SideBar({ session, signOutButton } : { session : Session | null, signOutButton : React.ReactNode }) {
//     const barButton = useRef(null);
//     const sidebar = useRef(null);
//     const [animating, setAnimating] = useState<boolean>(false);

//     function toggleSideBar() {
//         // const button = barButton.current as unknown as HTMLElement;
//         const side = sidebar.current as unknown as HTMLElement;

//         setAnimating(true);
        
//         if (side.classList.contains('showSidebar')) {
//             side.classList.remove('showSidebar');
//             side.offsetHeight;
//             side.classList.add('hideSidebar');

//             // button.classList.remove('showExit');
//             // button.offsetHeight;
//             // button.classList.add('showMenu');
//         } else {
//             side.style.display = 'block';
//             side.classList.remove('hideSidebar');
//             side.offsetHeight;
//             side.classList.add('showSidebar');

//             // button.classList.remove('showMenu');
//             // button.offsetHeight;
//             // button.classList.add('showExit');
//         }
//     }

//     return (
//         <div>
//             <div className='z-20 flex justify-end items-center'>
//                 <button ref={barButton} onClick={toggleSideBar} className={`w-16 h-16 select-none rounded-full bg-cover bg-[url('../../public/account.png')]`} disabled={animating}/>
//             </div>
//             <div ref={sidebar} onAnimationEnd={() => { setAnimating(false); const side = sidebar.current as unknown as HTMLElement; if (side.classList.contains('hideSidebar')) { side.style.display = 'none'; } }} className='absolute top-0 right-0 translate-x-full z-10 w-min h-3/4 p-12 pt-24 bg-red-600 shadow-xl'>
//                 <div className='py-8 grid grid-rows-2'>
//                     <div className='flex justify-end items-center'>
//                         {
//                             session && session.user ? 
//                             <div className='flex flex-col justify-center items-end'>
//                                 <p className='py-2 text-right text-white text-xl'>
//                                     {session.user.name}
//                                 </p>
//                                 <div className='my-2'>
//                                     {signOutButton}
//                                 </div>
//                             </div> :
//                             <Link className='w-min my-5 p-2 bg-gray-400 rounded-md text-white font-bold' href='/login'>Login/Signup</Link>
//                         }
//                     </div>
//                     <div className='flex justify-end items-center'>
//                         <Link className='w-min my-5 p-2 text-2xl text-white font-bold hover:text-gray-200 hover:underline' href='/schedules'>Schedules</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
