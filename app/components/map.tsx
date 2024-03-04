'use client';

import { useRef } from 'react';

export default function Map() {
    const overlay = useRef(null);

    return (
        <div className='w-full h-full relative'>
            <div ref={overlay} onClick={() => { (overlay.current as unknown as HTMLDivElement).style.zIndex = '-1'; }} className='w-full min-h-full absolute bg-gray-300 opacity-15 flex justify-center items-center'>
                <h3 className='text-3xl font-semibold'>Click to Focus</h3>
            </div>
            <iframe onMouseLeave={() => { (overlay.current as unknown as HTMLDivElement).style.zIndex = 'auto'; }} src="https://www.google.com/maps/d/embed?mid=1MGoj-ojH26UAkE3XJi637a41FHjxSfc&ehbc=2E312F&noprof=1" className='w-full min-h-full object-cover border-2' />
        </div>
    );
}
